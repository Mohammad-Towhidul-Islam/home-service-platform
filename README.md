# ShebaGhor — Home Service Booking Platform

JavaScript full-stack starter for a company-operated home service business in Chattogram, Bangladesh.

## Stack
- Next.js App Router + React (JavaScript/JSX; no TypeScript required)
- Tailwind CSS
- PostgreSQL + Prisma ORM
- Zod request validation, bcrypt password hashing, signed HttpOnly session cookie
- BDT pricing stored as integer paisa; Asia/Dhaka display for booking times

## Features included
- Bangla-first responsive homepage and service catalog
- Booking request form and PostgreSQL persistence
- Customer registration/login and own-bookings page
- Admin/manager booking list and status update API/dashboard
- Technician job list and assigned-job status update API
- Service catalog and staff management APIs (authorized)
- Audit log and booking status history
- Seeded service catalog and configurable example service areas

## Requirements
- Node.js 20+
- PostgreSQL 14+

## Local setup
1. Create a PostgreSQL database, e.g. `shebaghor`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and a random `AUTH_SECRET` (32+ characters).
3. Install and prepare the database:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open http://localhost:3000.

## Important setup notes
- Registering through the website creates a `CUSTOMER` account only. It does not grant admin access.
- Create an admin securely using a one-off local script or database administration after migration; never expose public admin registration. Example local bootstrap (run once and remove the script afterwards):

```js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
(async () => {
  const passwordHash = await bcrypt.hash('CHANGE_THIS_LONG_PASSWORD', 12);
  await prisma.user.upsert({ where: { phone: '01800000000' }, update: {}, create: { name: 'Company Admin', phone: '01800000000', passwordHash, role: 'ADMIN' } });
  await prisma.$disconnect();
})();
```
Save that snippet as a temporary `.cjs` file, run `node filename.cjs`, then delete it. Use a unique password and valid phone format.
- Anonymous bookings are associated with a phone-based customer record. To see bookings, sign in with an account whose user ID owns those bookings; the MVP does not automatically merge guest bookings into a later registered account.
- `GET /api/services` returns demo fallback cards if the database is unavailable, but booking creation requires PostgreSQL and a seeded active service.
- `npm run db:seed` inserts initial service categories, services, and service areas. Edit prices in the database/admin workflow for your business; sample prices are placeholders.
- This is an MVP foundation, not a production certification. Before launch, add automated tests, email/SMS verification, password reset, CSRF/origin protections as needed, upload scanning, rate limiting, formal booking transition rules, online payment gateway verification, backups, monitoring, and a security review.

## Main routes
- `/` public home page
- `/booking` booking form
- `/register`, `/login`
- `/my-bookings` customer booking list
- `/admin` operations dashboard (requires ADMIN/MANAGER)
- `/staff` technician dashboard (requires TECHNICIAN)

## API overview
- `GET /api/services`
- `POST /api/bookings`
- `GET /api/bookings/mine`
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET/PATCH /api/admin/bookings`
- `GET/POST /api/admin/services`
- `GET/POST /api/admin/staff`
- `GET/PATCH /api/staff/jobs`

## Build
```bash
npm run build
npm start
```

Do not deploy until the environment, migration, authorization, operational policies, and tests have been reviewed.
