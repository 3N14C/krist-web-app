// import { z } from "zod";
// import { publicProcedure, router } from "../trpc";
// import prisma from "../../../prisma/prisma-client";

// export const postOrder = router({
//   createOrder: publicProcedure
//     .input(
//       z.object({
//         productId: z.string(),
//         userId: z.string(),
//         size: z.string(),
//         quantity: z.number(),
//       })
//     )
//     .mutation(async ({ input }) => {
//       const createOrder = await prisma.order.create({
//         data: {
//           size: input.size,
//           quantity: input.quantity,

//           product: {
//             connect: {
//               id: input.productId,
//             },
//           },
//           user: {
//             connect: {
//               id: input.userId,
//             },
//           },
//         },
//       });

//       return createOrder;
//     }),
// });
