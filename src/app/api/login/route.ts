import { neon } from "@neondatabase/serverless";
import {
  createHmac,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { NextResponse } from "next/server";

const scryptAsync = promisify(scrypt);

async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, hash] = storedHash.split("$");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  try {
    const expected = Buffer.from(hash, "hex");
    const actual = (await scryptAsync(
      password,
      salt,
      expected.length
    )) as Buffer;

    return (
      expected.length === actual.length &&
      timingSafeEqual(expected, actual)
    );
  } catch {
    return false;
  }
}

function createSessionToken(userId: string, expiresAt: number) {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is missing or too short.");
  }

  const payload = Buffer.from(
    JSON.stringify({
      sub: userId,
      exp: expiresAt,
    })
  ).toString("base64url");

  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl || !process.env.SESSION_SECRET) {
      return NextResponse.json(
        { error: "Login service is not configured correctly." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const identifier = String(body.identifier ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");
    const remember = body.remember === true;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Enter your username or email and password." },
        { status: 400 }
      );
    }

    const sql = neon(databaseUrl);

    const users = await sql`
      SELECT
        id,
        username,
        full_name,
        email,
        phone_number,
        role,
        password_hash
      FROM users
      WHERE LOWER(email) = ${identifier}
         OR LOWER(username) = ${identifier}
      LIMIT 1
    `;

    const user = users[0];

    if (
      !user ||
      !(await verifyPassword(password, String(user.password_hash)))
    ) {
      return NextResponse.json(
        { error: "Incorrect username/email or password." },
        { status: 401 }
      );
    }

    const lifetime = remember
      ? 30 * 24 * 60 * 60
      : 8 * 60 * 60;

    const expiresAt = Math.floor(Date.now() / 1000) + lifetime;

    const token = createSessionToken(String(user.id), expiresAt);

    const response = NextResponse.json({
      message: "Signed in successfully.",
      user: {
        id: user.id,
        username: user.username,
        name: user.full_name,
        email: user.email,
        phone: user.phone_number,
        role: user.role,
      },
    });

    response.cookies.set("nexora_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: lifetime,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Unable to sign in. Please try again." },
      { status: 500 }
    );
  }
}