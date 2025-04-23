import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Hardcoded valid credentials
  const validUsername = "user1";
  const validPassword = "bigmman";

  // Validate the username and password
  if (username === validUsername && password === validPassword) {
    return NextResponse.json({ message: "Login successful" });
  } else {
    return NextResponse.json({ message: "Invalid username or passwords" }, { status: 401 });
  }
}
