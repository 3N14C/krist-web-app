// import { publicProcedure, router } from "../trpc";
// import { createServiceOrderSchema } from "../zod-validators/post-create-service-order";
// import prisma from "../../../prisma/prisma-client";

// export const createServiceOrder = router({
//   createServiceOrder: publicProcedure
//     .input(createServiceOrderSchema)
//     .mutation(async ({ input }) => {
//       try {
//         const createServiceOrder = await prisma.orderService.create({
//           data: {
//             serviceId: input.serviceId,
//             user: {
//               connect: {
//                 id: input.userId,
//               },
//             },
//           },
//         });

//         return createServiceOrder;
//       } catch (error) {
//         throw new Error(`${error}`);
//       }
//     }),
// });
