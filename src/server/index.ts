import { authUser } from "./routes/auth-user";
import { payment } from "./routes/checkout";
import { getCategory } from "./routes/get-category";
import { getCollection } from "./routes/get-collection";
import { getColor } from "./routes/get-color";
import { getOrders } from "./routes/get-order";
import { getProducts } from "./routes/get-products";
import { getSize } from "./routes/get-size";
import { postOrder } from "./routes/post-order";
import { postProducts } from "./routes/post-products";
import { postReview } from "./routes/post-review";
import { router } from "./trpc";

export const appRouter = router({
  // GET
  authUser: authUser,
  category: getCategory,
  collection: getCollection,
  products: getProducts,
  colors: getColor,
  sizes: getSize,
  orders: getOrders,

  // POST
  createProduct: postProducts,
  createReview: postReview,
  createOrder: postOrder,
  // CREATE ORDER
  checkout: payment,
});

export type AppRouter = typeof appRouter;
