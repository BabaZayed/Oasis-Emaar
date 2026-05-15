# 🚀 Oasis Emaar — Deployment Guide

## Your Options (Ranked Best → Worst)

| # | Method | Cost | Difficulty | Performance |
|---|--------|------|-----------|-------------|
| ✅ 1 | **Vercel + Namecheap DNS** | FREE | Easy | Excellent |
| 2 | Namecheap VPS | $5-10/mo | Medium | Good |
| 3 | Namecheap Shared Hosting (cPanel) | Included | Hard | Poor |

---

# ═══════════════════════════════════════════════════════
# OPTION 1: Vercel + Namecheap DNS (RECOMMENDED ✅)
# ═══════════════════════════════════════════════════════

## Why Vercel?
- Created by the Next.js team — zero-config deployment
- Free tier handles 100K+ visitors/month
- Auto SSL, CDN, serverless functions
- You keep your domain at Namecheap, just point DNS

## Step 1: Get a Free PostgreSQL Database

Your site needs a database for leads. Since Vercel is serverless (no persistent files), you need a cloud database.

### Option A: Neon (Recommended — Free tier is generous)
1. Go to https://neon.tech and sign up (free)
2. Click "Create Project" → name it "oasis-emaar"
3. Select region: **Singapore** (closest to Dubai/Middle East)
4. Click "Create Project"
5. Copy the **Connection string** — it looks like:
   ```
   postgresql://neondb_owner:abc123@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
6. Save this — you'll need it in Step 3

### Option B: Supabase (Also free)
1. Go to https://supabase.com and sign up
2. Create a new project
3. Go to Settings → Database → Connection string → URI
4. Copy it

## Step 2: Push Your Code to GitHub

```bash
# If you haven't already:
cd /home/z/my-project

# Make sure .env is in .gitignore (it already is)
cat .gitignore | grep .env

# Add all files
git add -A
git commit -m "Production ready - Oasis Emaar website"

# Create a GitHub repo first at https://github.com/new
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/oasis-emaar.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your **oasis-emaar** repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `prisma generate && next build` (already in package.json)
   - **Output Directory**: leave default
5. Add **Environment Variables** (click "Environment Variables"):

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:abc123@ep-xxx.neon.tech/neondb?sslmode=require` |
| `ADMIN_API_KEY` | `a-random-secure-string-change-this` |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` (your real GA4 ID, or leave placeholder) |
| `NEXT_PUBLIC_META_PIXEL_ID` | `YOUR_META_PIXEL_ID` (your real pixel ID, or leave placeholder) |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | `YOUR_GOOGLE_VERIFICATION_CODE` (or leave placeholder) |

6. Click **"Deploy"**
7. Wait 2-3 minutes — Vercel will build and deploy
8. You'll get a URL like: `oasis-emaar.vercel.app`

## Step 4: Set Up Database Tables

After Vercel deploys, you need to create the database tables:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Pull env vars locally
vercel env pull .env.local

# Run migration
npx prisma migrate dev --name init

# Or just push schema directly:
npx prisma db push
```

Alternatively, use the Neon/Supabase SQL editor to run:

```sql
CREATE TABLE "Lead" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "budget" TEXT,
    "timeline" TEXT,
    "nationality" TEXT,
    "propertyInterest" TEXT,
    "source" TEXT DEFAULT 'website',
    "leadScore" INTEGER DEFAULT 0,
    "isQualified" BOOLEAN DEFAULT false,
    "isSpam" BOOLEAN DEFAULT false,
    "formType" TEXT DEFAULT 'general',
    "message" TEXT,
    "pageUrl" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "RateLimit" (
    "id" TEXT PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "count" INTEGER DEFAULT 1,
    "windowStart" TIMESTAMP DEFAULT NOW(),
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "Post" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

## Step 5: Point Namecheap Domain to Vercel

1. Log into **Namecheap** → **Domain List** → **Manage** next to oasisemaar.com
2. Go to **Advanced DNS** tab
3. **Remove** any existing A records and CNAME records for `@` and `www`
4. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `@` | `cname.vercel-dns.com` | Automatic |
| CNAME | `www` | `cname.vercel-dns.com` | Automatic |

5. Go to **Vercel Dashboard** → Your Project → **Settings** → **Domains**
6. Add `oasisemaar.com` and `www.oasisemaar.com`
7. Vercel will auto-provision SSL certificates

**DNS propagation takes 5 min to 48 hours (usually under 1 hour)**

## Step 6: Verify Everything

1. Visit `https://oasisemaar.com` — your site should load
2. Test the lead form — submit a test lead
3. Check leads: `curl -H "Authorization: Bearer YOUR_ADMIN_KEY" https://oasisemaar.com/api/leads`
4. Test WhatsApp button
5. Check Google Analytics (if configured)

---

# ═══════════════════════════════════════════════════════
# OPTION 2: Namecheap VPS (If You Prefer Self-Hosting)
# ═══════════════════════════════════════════════════════

## Prerequisites
- Namecheap VPS (Quasar or above) — ~$5-10/month
- SSH access to your server
- Basic terminal knowledge

## Step 1: Set Up the VPS

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Git
apt install -y git
```

## Step 2: Set Up PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE oasisemaar;
CREATE USER oasisuser WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE oasisemaar TO oasisuser;
\q
```

## Step 3: Deploy Your App

```bash
# Clone from GitHub
cd /var/www
git clone https://github.com/YOUR_USERNAME/oasis-emaar.git
cd oasis-emaar

# Install dependencies
npm install

# Create .env file
cat > .env << 'EOF'
DATABASE_URL="postgresql://oasisuser:your-secure-password@localhost:5432/oasisemaar?schema=public"
ADMIN_API_KEY="your-secure-admin-key"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="YOUR_META_PIXEL_ID"
NEXT_PUBLIC_GOOGLE_VERIFICATION="YOUR_GOOGLE_VERIFICATION_CODE"
EOF

# Generate Prisma client and migrate
npx prisma generate
npx prisma db push

# Build the app
npm run build

# Start with PM2
pm2 start npm --name "oasis-emaar" -- start
pm2 save
pm2 startup
```

## Step 4: Configure Nginx

```bash
cat > /etc/nginx/sites-available/oasis-emaar << 'EOF'
server {
    listen 80;
    server_name oasisemaar.com www.oasisemaar.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/oasis-emaar /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

## Step 5: Add SSL (Free with Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d oasisemaar.com -d www.oasisemaar.com

# Auto-renewal is set up automatically
```

## Step 6: Update Namecheap DNS

1. Log into Namecheap → Domain List → Manage → Advanced DNS
2. Add A records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `YOUR_VPS_IP` | Automatic |
| A | `www` | `YOUR_VPS_IP` | Automatic |

---

# ═══════════════════════════════════════════════════════
# OPTION 3: Namecheap Shared Hosting (cPanel) — LAST RESORT
# ═══════════════════════════════════════════════════════

⚠️ This only works if your cPanel has **"Setup Node.js App"** feature.
Check: Login to cPanel → search for "Node.js" → if you see it, proceed.

## Step 1: Check Node.js Support

1. Login to cPanel (yourdomain.com/cpanel or yourdomain.com:2083)
2. Search for **"Setup Node.js App"**
3. If NOT found → this option won't work. Use Option 1 or 2 instead.

## Step 2: Create Node.js App in cPanel

1. Click **"Setup Node.js App"**
2. Click **"Create Application"**
3. Settings:
   - Node.js version: **20.x** (or latest available)
   - Application mode: **Production**
   - Application root: `oasis-emaar`
   - Application URL: `oasisemaar.com`
   - Application startup file: leave blank (we'll configure later)
4. Click **"Create"**

## Step 3: Upload Files

1. Use cPanel **File Manager** or **FTP** (FileZilla)
2. Upload all project files to `~/oasis-emaar/`
3. **IMPORTANT**: Also upload `.env` file with your DATABASE_URL
4. For the database, use cPanel's **MySQL** or a remote PostgreSQL

## Step 4: Install & Build via SSH

```bash
# SSH into your hosting (cPanel → Terminal)
cd ~/oasis-emaar

# Install dependencies
npm install

# Build
npm run build

# Run migrations
npx prisma db push
```

## Step 5: Configure Startup

In the Node.js App settings in cPanel:
- Set the startup file to: `.next/standalone/server.js`
- Add environment variables in the cPanel interface
- Click "Run NPM Install" if available
- Click "Restart"

---

# ═══════════════════════════════════════════════════════
# IMPORTANT NOTES
# ═══════════════════════════════════════════════════════

## Environment Variables You Need

| Variable | Where to Get | Required? |
|----------|-------------|-----------|
| `DATABASE_URL` | Neon.tech or Supabase (free) | ✅ YES |
| `ADMIN_API_KEY` | Make up a secure random string | ✅ YES |
| `NEXT_PUBLIC_GA_ID` | Google Analytics → Admin → Data Streams | Later |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Business Suite → Events Manager | Later |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console | Later |

## After Deployment Checklist

- [ ] Site loads at https://oasisemaar.com
- [ ] SSL certificate is active (lock icon in browser)
- [ ] Lead capture forms work (test with your details)
- [ ] WhatsApp button works (+971526919169)
- [ ] All pages load: /projects, /inventory, /contact, /faq, etc.
- [ ] Google Analytics tracking (add real GA4 ID when ready)
- [ ] Meta Pixel tracking (add real pixel ID when ready)
- [ ] Google Search Console verification (add code when ready)
- [ ] Submit sitemap to Google: https://oasisemaar.com/sitemap.xml

## How to View Your Leads

```bash
# Using curl (replace with your admin key):
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" https://oasisemaar.com/api/leads

# This returns JSON with all leads, their scores, and stats
```

## How to Update Your Site Later

**With Vercel:**
1. Make changes to your code
2. Push to GitHub: `git add -A && git commit -m "update" && git push`
3. Vercel auto-deploys within 60 seconds

**With VPS:**
1. SSH into server
2. `cd /var/www/oasis-emaar`
3. `git pull`
4. `npm install` (if dependencies changed)
5. `npm run build`
6. `pm2 restart oasis-emaar`

## Need Help?

If you run into issues, the most common problems are:
1. **Build fails**: Check that all dependencies are in package.json
2. **Database connection error**: Verify DATABASE_URL is correct
3. **404 on pages**: Make sure Next.js build completed successfully
4. **SSL not working**: Wait for DNS propagation, then re-issue certificate
