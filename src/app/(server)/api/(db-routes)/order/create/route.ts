import { NextRequest, NextResponse } from "next/server";
import YooKassa from "yookassa-ts/lib/yookassa";
import prisma from "../../../../../../../prisma/prisma-client";
import { IAmount } from "yookassa-ts/lib/types/Common";
import { PaymentMethodsEnum } from "yookassa-ts/lib/types/PaymentMethod";

const yooKassa = new YooKassa({
  shopId: process.env.YOOKASSA_SHOP_ID,
  secretKey: process.env.YOOKASSA_SECRET_KEY,
});

export const POST = async (req: NextRequest) => {
  const input: {
    products: { id: string }[];
    totalPrice: number;
    userId: string;
    quantity: number;
    size: string;
  } = await req.json();

  const totalPrice = input.totalPrice;
  const productsInCart = await prisma.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const checkoutSession = await yooKassa.createPayment({
    amount: {
      value: totalPrice.toString(),
      currency: "RUB" as IAmount["currency"],
    },

    payment_method_data: {
      type: "bank_card" as PaymentMethodsEnum.bank_card,
    },

    confirmation: {
      type: "redirect",
      return_url: process.env.YOOKASSA_RETURN_URL!,
      confirmation_url: process.env.YOOKASSA_CONFIRMATION_URL!,
    },

    description: "Оплата заказа",
    capture: true,
  });

  const order = await prisma.order.create({
    data: {
      userId: input.userId,
      product: {
        connect: productsInCart.map((product) => ({
          id: product.id,
        })),
      },
      quantity: input.quantity,
      size: input.size,
    },
  });

  return NextResponse.json({
    order,
    url: checkoutSession.confirmationUrl,
    isPaid: checkoutSession.paid,
  });
};
