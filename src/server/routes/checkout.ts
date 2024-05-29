// import YooKassa from "yookassa-ts/lib/yookassa";
// import { publicProcedure, router } from "../trpc";
// import { z } from "zod";
// import prisma from "../../../prisma/prisma-client";
// import { IAmount } from "yookassa-ts/lib/types/Common";
// import { PaymentMethodsEnum } from "yookassa-ts/lib/types/PaymentMethod";

// const yooKassa = new YooKassa({
//   shopId: process.env.YOOKASSA_SHOP_ID,
//   secretKey: process.env.YOOKASSA_SECRET_KEY,
// });

// export const payment = router({
//   checkoutOrder: publicProcedure
//     .input(
//       z.object({
//         products: z.array(
//           z.object({
//             id: z.string(),
//           })
//         ),
//         totalPrice: z.number(),
//         userId: z.string(),
//       })
//     )
//     .mutation(async ({ input }) => {
//       try {
//         const totalPrice = input.totalPrice;
//         const productsInCart = await prisma.product.findMany({
//           where: {
//             id: {
//               in: input.products.map((product) => product.id),
//             },
//           },
//         });

//         if (productsInCart) {
//           const checkoutSession = await yooKassa.createPayment({
//             amount: {
//               value: totalPrice.toString(),
//               currency: "RUB" as IAmount["currency"],
//             },

//             payment_method_data: {
//               type: "bank_card" as PaymentMethodsEnum.bank_card,
//             },

//             confirmation: {
//               type: "redirect",
//               return_url: process.env.YOOKASSA_RETURN_URL!,
//               confirmation_url: process.env.YOOKASSA_CONFIRMATION_URL!,
//             },

//             description: "Оплата заказа",
//             capture: true,
//           });

//           console.log("isPending", checkoutSession.isPending);
//           console.log("isResolved", checkoutSession.isResolved);
//           console.log("isSuccessed", checkoutSession.isSucceeded);
//           console.log(
//             "isWaitingForCapture",
//             checkoutSession.isWaitingForCapture
//           );
//           console.log("isPaid", checkoutSession.paid);

//           return {
//             url: checkoutSession.confirmationUrl,
//             isPaid: checkoutSession.paid,
//           };
//         }

//         return {
//           url: "",
//           isPaid: "Ничего",
//         };
//       } catch (error) {
//         console.log(error);
//         throw new Error("Произошла ошибка при создании сессии");
//       }
//     }),
// });
