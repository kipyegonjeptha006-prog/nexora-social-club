
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "You have been logged out successfully.",
  });

  response.cookies.set("nexora_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
