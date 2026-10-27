import { PrismaClient } from '@prisma/client'

// The local Prisma database is OPTIONAL. schema.prisma uses provider "sqlite", so the
// only usable DATABASE_URL is a `file:` URL. On Vercel there is no persistent local
// database (DATABASE_URL is unset on Preview and not a file: URL on Production), and an
// unusable DB must never fail a visitor request. Callers use withDb(), which returns a
// fallback instead of throwing; lead delivery runs through the CC_BRIDGE regardless.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Detected once per instance, on first use, from the env var alone (no connection attempt).
// Lazy because Prisma's client may populate DATABASE_URL from a .env file when it loads.
let detected = false
let dbUrlSet = false
let dbConfigured = false
let dbUsable = false
let warned = false

function detect() {
  if (detected) return
  detected = true
  const url = (process.env.DATABASE_URL || '').trim()
  dbUrlSet = url.length > 0
  dbConfigured = url.startsWith('file:')
  dbUsable = dbConfigured
}

function warnDisabled(reason: string) {
  if (warned) return
  warned = true
  console.warn(
    `[DB] Local database disabled (${reason}). Lead dedupe/storage and marketplace listings are skipped; visitor requests continue normally.`
  )
}

/** True when a usable local DB is configured. Logs one warning per instance otherwise. */
export function hasDb(): boolean {
  detect()
  if (!dbUsable) {
    warnDisabled(
      dbConfigured ? 'database failed to initialise' : dbUrlSet ? 'DATABASE_URL is not a file: URL' : 'DATABASE_URL is not set'
    )
  }
  return dbUsable
}

/**
 * Run a DB operation if a usable DB exists; otherwise (or on any DB error) return `fallback`.
 * An initialisation failure (bad URL, missing file, read-only FS) disables the DB for the
 * rest of this instance so later requests skip it without paying for another attempt.
 */
export async function withDb<T>(op: (client: PrismaClient) => Promise<T>, fallback: T): Promise<T> {
  if (!hasDb()) return fallback
  try {
    return await op(db)
  } catch (error) {
    const name = (error as { name?: string })?.name || 'Error'
    if (name === 'PrismaClientInitializationError') {
      dbUsable = false
      warnDisabled('database failed to initialise: ' + String((error as Error)?.message || '').split('\n').filter(Boolean).pop()?.slice(0, 160))
    } else {
      console.warn('[DB] Query failed, continuing without the local database:', name, String((error as Error)?.message || '').slice(0, 200))
    }
    return fallback
  }
}
