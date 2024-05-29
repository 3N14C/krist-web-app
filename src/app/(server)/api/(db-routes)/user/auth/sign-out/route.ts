import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  cookies().delete("token");

  return NextResponse.json({ token: null });
};
