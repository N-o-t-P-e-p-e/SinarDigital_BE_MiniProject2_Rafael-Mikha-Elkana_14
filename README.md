# SinarDigital_BE_MiniProject2_NAMA_KELAS

Scaffold project for Mini Project 2 - Back End.

## Features included
- Prisma with PostgreSQL (schema.prisma provided)
- Two models with 1-to-many relationship: User and Post
- Seeder script to create dummy data (20+ records)
- CRUD for posts with image upload (multer) storing files on local `uploads/`
- Simple EJS views for listing, create and edit
- .env.example provided

## How to run (local)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a PostgreSQL database and set `DATABASE_URL` in `.env`.
   Example `.env`:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/dbname?schema=public"
   ```
3. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Seed database:
   ```bash
   node prisma/seed.js
   ```
5. Start the app:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000` to view.

