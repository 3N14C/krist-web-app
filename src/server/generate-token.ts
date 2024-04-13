import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
export const MAX_AGE = 60 * 60 * 24 * 30;

export const generateToken = async (
  args: any,
  ctx: FetchCreateContextFnOptions
) => {
  const token = sign(args, secret || "", {
    expiresIn: MAX_AGE,
  });

  const serialized = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  ctx.resHeaders.set("Set-Cookie", serialized);

  return serialized;
};
