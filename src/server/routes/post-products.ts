// import { publicProcedure, router } from "../trpc";
// import { postProductSchema } from "../zod-validators/post-product.validator";
// import prisma from "../../../prisma/prisma-client";

// export const postProducts = router({
//   addProduct: publicProcedure
//     .input(postProductSchema)
//     .mutation(async ({ input, ctx }) => {
//       try {
//         const createProduct = await prisma.product.create({
//           data: input,
//         });

//         return createProduct;
//       } catch (error) {
//         console.log(error);
//       }
//     }),
// });
