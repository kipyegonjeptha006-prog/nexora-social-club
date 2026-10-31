import { neon } from "@neondatabase/serverless";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function verifyToken(token: string) {
  try {
    const secret = process.env.SESSION_SECRET;

    if (!secret) return null;

    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payload, signature] = parts;

    const expectedSignature = createHmac("sha256", secret)
      .update(payload)
      .digest();

    const receivedSignature = Buffer.from(signature, "base64url");

    if (
      expectedSignature.length !== receivedSignature.length ||
      !timingSafeEqual(expectedSignature, receivedSignature)
    ) {
      return null;
    }

    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    );

    if (!data.sub || data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return String(data.sub);
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("nexora_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    const userId = verifyToken(token);

    if (!userId || !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Invalid session." },
        { status: 401 }
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    const users = await sql`
      SELECT id, username, full_name, email, phone_number, role
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Member account not found." },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: users[0] });
  } catch (error) {
    console.error("Session verification error:", error);

    return NextResponse.json(
      { error: "Unable to verify session." },
      { status: 500 }
    );
  }
}