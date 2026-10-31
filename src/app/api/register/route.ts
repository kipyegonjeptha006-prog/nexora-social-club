
import { neon } from "@neondatabase/serverless";
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { NextResponse } from "next/server";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${key.toString("hex")}`;
}

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database connection is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const username = String(body.username ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const password = String(body.password ?? "");

    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      return NextResponse.json(
        { error: "Username must be 3–30 characters using letters, numbers or underscores." },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 150) {
      return NextResponse.json(
        { error: "Enter a valid full name." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (!/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
      return NextResponse.json(
        { error: "Enter a valid phone number." },
        { status: 400 }
      );
    }

    if (password.length < 12 || password.length > 128) {
      return NextResponse.json(
        { error: "Password must contain at least 12 characters." },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    const existing = await sql`
      SELECT id FROM users
      WHERE email = ${email}
         OR LOWER(username) = ${username}
         OR phone_number = ${phone}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "That email, username or phone number is already registered." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const users = await sql`
      INSERT INTO users
        (username, full_name, email, phone_number, password_hash)
      VALUES
        (${username}, ${name}, ${email}, ${phone}, ${passwordHash})
      RETURNING id, username, full_name, email, phone_number, role, created_at
    `;

    return NextResponse.json(
      {
        message: "Your Nexora account has been created successfully.",
        user: users[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
