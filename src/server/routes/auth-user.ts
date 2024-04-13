import { publicProcedure, router } from "../trpc";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../zod-validators/user.validator";
import prisma from "../../../prisma/prisma-client";
import { generateToken } from "../generate-token";
import { z } from "zod";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { Session, User } from "@prisma/client";
import { updateCurrentUserSchema } from "../zod-validators/update-current-user.validator";
import { cookies } from "next/headers";

export const authUser = router({
  registerUser: publicProcedure
    .input(userRegisterSchema)
    .mutation(async ({ input, ctx }) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existingUser) {
        throw new Error("Пользователь с такой почтой уже существует");
      }

      const createUser = await prisma.user.create({
        data: input,
      });

      const createSession = await prisma.session.create({
        data: {
          userId: createUser.id,
        },

        include: {
          user: true,
        },
      });

      await generateToken(createUser, ctx);

      return createSession;
    }),

  loginUser: publicProcedure
    .input(userLoginSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new Error("Неверная почта или пароль");
      }

      await generateToken(user, ctx);
    }),

  logoutUser: publicProcedure.mutation(async ({ ctx }) => {
    ctx.resHeaders.set(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      })
    );

    return;
  }),

  getUserSession: publicProcedure.query(
    async ({ ctx }): Promise<void | User> => {
      try {
        const token = cookies().get("token")?.value;

        if (!token) {
          throw new Error("Токен отсутствует");
        }

        const user = jwt.verify(
          token,
          process.env.JWT_SECRET || "",
          (err, decoded) => {
            if (err) {
              throw new Error("Токен недействителен");
            }

            const user = prisma.user.findUnique({
              where: {
                id: (decoded as User)?.id,
              },
            });

            if (!user) {
              throw new Error("User not found");
            }

            return user;
          }
        );

        return user;
      } catch (error) {
        console.log(error);
      }
    }
  ),

  updateCurrentUser: publicProcedure
    .input(updateCurrentUserSchema)
    .mutation(async ({ input, ctx }): Promise<void | User> => {
      try {
        const token = cookies().get("token")?.value;

        if (!token) {
          throw new Error("Токен отсутствует");
        }

        const user = jwt.verify(
          token,
          process.env.JWT_SECRET || "",
          (err, decoded) => {
            if (err) {
              throw new Error("Токен недействителен");
            }

            const user = prisma.user.update({
              where: {
                id: (decoded as User)?.id,
              },

              data: {
                username: input.username || "",
                email: input.email || "",
                avatar: input.avatar,
                phone: input.phoneNumber,
              },
            });

            if (!user) {
              throw new Error("User not found");
            }

            return user;
          }
        );

        return user;
      } catch (error) {
        console.log(error);
      }
    }),

  getUserByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: {
          username: input.name,
        },
      });
      if (!user) {
        throw new Error("Пользователь не найден");
      }
      return user;
    }),

  changeUserPassword: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          email: input.email,
        },

        data: {
          password: input.password,
        },
      });

      if (!user) {
        throw new Error("Пользователь не найден");
      }

      return user;
    }),
});
