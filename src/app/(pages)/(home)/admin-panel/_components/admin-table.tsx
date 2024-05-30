"use client";

import { CategoryService } from "@/actions/category/category-service";
import { CollectionService } from "@/actions/collection/collection-service";
import { OrderService } from "@/actions/order/order-service";
import { ProductService } from "@/actions/product/product-service";
import { ServiceService } from "@/actions/service/service";
import { UserService } from "@/actions/user/user-service";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { UserModal } from "./modals/user-modal";
import { AddCategoryModal } from "./modals/add-category-modal/add-category-modal";
import { CategoryModal } from "./modals/category-modal/category-modal";
import { AddCollectionModal } from "./modals/add-collection-modal/add-collection-modal";
import { CollectionModal } from "./modals/collection-modal/collection-modal";

const tableColumns = [
  {
    id: "users",
    name: "Пользователи",
  },
  {
    id: "categories",
    name: "Категории",
  },
  {
    id: "collections",
    name: "Коллекции",
  },
  {
    id: "products",
    name: "Товары",
  },
  {
    id: "orders",
    name: "Заказы",
  },

  {
    id: "services",
    name: "Услуги",
  },
];

export const AdminTable: FC = () => {
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] =
    useState<boolean>(false);
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  const [openAddCollectionModal, setOpenAddCollectionModal] =
    useState<boolean>(false);
  const [openCollectionModal, setOpenCollectionModal] =
    useState<boolean>(false);

  const [userId, setUserId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [collectionId, setCollectionId] = useState<string>("");

  const openStatesment = (name: string) => {
    if (name === "Категории") setOpenAddCategoryModal(true);
    if (name === "Коллекции") setOpenAddCollectionModal(true);
  };

  const { data: categories } = useQuery({
    queryKey: ["admin-categories-list"],
    queryFn: CategoryService.getAll,
  });

  const { data: collections } = useQuery({
    queryKey: ["admin-collections-list"],
    queryFn: CollectionService.getAll,
  });

  const { data: products } = useQuery({
    queryKey: ["admin-product-list"],
    queryFn: ProductService.getAll,
  });

  const { data: orders } = useQuery({
    queryKey: ["admin-order-lsit"],
    queryFn: OrderService.getAll,
  });

  const { data: services } = useQuery({
    queryKey: ["admin-service-list"],
    queryFn: ServiceService.getAll,
  });

  const { data: users } = useQuery({
    queryKey: ["admin-user-list"],
    queryFn: UserService.getAll,
  });

  return (
    <div className="w-full">
      <UserModal
        open={openUserModal}
        setOpen={setOpenUserModal}
        userId={userId}
      />
      <AddCategoryModal
        open={openAddCategoryModal}
        setOpen={setOpenAddCategoryModal}
      />
      <AddCollectionModal
        open={openAddCollectionModal}
        setOpen={setOpenAddCollectionModal}
      />
      <CategoryModal
        open={openCategoryModal}
        setOpen={setOpenCategoryModal}
        categoryId={categoryId}
      />
      <CollectionModal
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        collectionId={collectionId}
      />

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {tableColumns.map((column) => (
              <TableHead key={column.id} className="font-medium">
                <p
                  onClick={() => openStatesment(column.name)}
                  className="hover:text-primary hover:underline underline-offset-2 transition duration-300 cursor-pointer max-w-fit"
                >
                  {column.name}
                </p>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="">
              <div className="flex flex-col gap-5">
                {users?.map((user) => (
                  <p
                    onClick={() => {
                      setOpenUserModal(true);
                      setUserId(user.id);
                    }}
                    className="hover:underline underline-offset-2 transition duration-300 cursor-pointer"
                    key={user.id}
                  >
                    {user.email}
                  </p>
                ))}
              </div>
            </TableCell>

            <TableCell className="">
              <div className="flex flex-col gap-5">
                {categories?.map((category) => (
                  <div
                    onClick={() => {
                      setOpenCategoryModal(true);
                      setCategoryId(category.id);
                    }}
                    key={category.id}
                  >
                    <p className="hover:underline underline-offset-2 transition duration-300 cursor-pointer">
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
            </TableCell>

            <TableCell className="">
              <div className="flex flex-col gap-5">
                {collections?.map((collection) => (
                  <p
                    onClick={() => {
                      setOpenCollectionModal(true);
                      setCollectionId(collection.id);
                    }}
                    className="hover:underline underline-offset-2 transition duration-300 cursor-pointer"
                    key={collection.id}
                  >
                    {collection.name}
                  </p>
                ))}
              </div>
            </TableCell>

            <TableCell className="">
              <div className="flex flex-col gap-5">
                {products?.map((product) => (
                  <p
                    className="hover:underline underline-offset-2 transition duration-300 cursor-pointer"
                    key={product.id}
                  >
                    {product.name}
                  </p>
                ))}
              </div>
            </TableCell>

            <TableCell className="">
              <div className="flex flex-col gap-5">
                {orders?.map((order) => (
                  <p
                    className="hover:underline underline-offset-2 transition duration-300 cursor-pointer"
                    key={order.id}
                  >
                    {order.id}
                  </p>
                ))}
              </div>
            </TableCell>

            <TableCell className="">
              <div className="flex flex-col gap-5">
                {services?.map((service) => (
                  <p
                    className="hover:underline underline-offset-2 transition duration-300 cursor-pointer"
                    key={service.id}
                  >
                    {service.name}
                  </p>
                ))}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
