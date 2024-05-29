// import { publicProcedure, router } from "../trpc";
// import prisma from "../../../prisma/prisma-client";
// import { z } from "zod";

// export const getOrders = router({
//   getOrders: publicProcedure.query(async ({ ctx }) => {
//     const orders = await prisma.order.findMany({
//       include: {
//         user: true,
//         product: true
//       },
//     });

//     return orders;
//   }),

//   getOrdersByUserId: publicProcedure
//     .input(z.string())
//     .query(async ({ input }) => {
//       const orders = await prisma.order.findMany({
//         where: {
//           userId: input,
//         },
//         include: {
//           user: true,
//           product: true
//         },
//       });

//       return orders;
//     }),
// });
