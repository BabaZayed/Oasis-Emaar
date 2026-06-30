/**
 * Meta Flow Health Check
 * GET/POST /api/flow-health
 * Returns plain 200 OK — Meta uses this to verify flow endpoint is alive.
 */
export async function GET() {
  return new Response('OK', { status: 200 });
}

export async function POST() {
  return new Response('OK', { status: 200 });
}
