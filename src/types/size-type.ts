import { Prisma } from "@prisma/client";

export type AllSize = Prisma.SizeGetPayload<{ include: { products: true } }>;
