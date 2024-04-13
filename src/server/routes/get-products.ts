import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../../../prisma/prisma-client";
import { publicProcedure, router } from "../trpc";

export const getProducts = router({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    return await prisma.product.findMany({
      include: {
        category: true,
        collection: true,
        reviews: true,
        colors: true,
        sizes: true,
      },
    });
  }),

  getProductById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const product = await prisma.product.findUnique({
      where: {
        id: input,
      },

      include: {
        reviews: {
          include: {
            user: true,
          },
        },
        colors: true,
        sizes: true,
      },
    });

    return product;
  }),

  getProductsByslug: publicProcedure
    .input(
      z.object({
        categoryId: z.string().array().optional(),
        collectionId: z.string().array().optional(),
        price: z.number().optional(),
        colorId: z.string().array().optional(),
        sizeId: z.string().array().optional(),
      })
    )
    .query(async ({ input }) => {
      let whereCondition: Prisma.ProductWhereInput = {};

      if (input.categoryId && input.categoryId.length > 0) {
        whereCondition.categoryId = {
          in: input.categoryId,
        };
      }

      if (input.collectionId && input.collectionId.length > 0) {
        whereCondition.collectionId = {
          in: input.collectionId,
        };
      }

      if (input.price) {
        whereCondition.price = {
          gte: input.price,
        };
      }

      if (input.colorId && input.colorId.length > 0) {
        whereCondition.colors = {
          some: {
            id: {
              in: input.colorId,
            },
          },
        };
      }

      if (input.sizeId && input.sizeId.length > 0) {
        whereCondition.sizes = {
          some: {
            id: {
              in: input.sizeId,
            },
          },
        };
      }

      const products = await prisma.product.findMany({
        where: whereCondition,

        include: {
          reviews: true,
          colors: true,
          sizes: true,
        },
      });

      return products;
    }),

  getRelatedProducts: publicProcedure
    .input(z.object({ collectionId: z.string(), productId: z.string() }))
    .query(async ({ input }) => {
      const relatedProducts = await prisma.product.findMany({
        where: {
          collectionId: input.collectionId,
          id: {
            not: input.productId,
          },
        },

        take: 4,

        include: {
          reviews: true,
          colors: true,
          sizes: true,
        },
      });

      return relatedProducts;
    }),

    getBestSellerProducts: publicProcedure
    .query(async ({ ctx }) => {
      const products = await prisma.product.findMany({
        where: {
          reviews: {
            some: {
              rating: {
                gte: 3,
              },
            },
          },
        },

        take: 8,
        orderBy: {
          reviews: {
            _count: "desc",
          },
        },
      });

      return products;
    })
});
