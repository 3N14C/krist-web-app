import { NextPage } from "next";
import { AdminCategoryList } from "./_components/category/admin-category-list";
import { AdminCollectionList } from "./_components/collection/admin-collection-list";
import { AdminProductList } from "./_components/product/admin-product-list";
import { AdminOrderList } from "./_components/order/admin-order-list";
import { AdminTable } from "./_components/admin-table";

interface Props {}

const tableColumns = [
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
];

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="mt-20">
      {/* <div className="grid grid-cols-4 justify-items-center">
        {tableColumns.map((column) => (
          <div key={column.id} className="">
            <p className="text-xl font-semibold">{column.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 justify-items-center mt-5">
        <AdminCategoryList />
        <AdminCollectionList />
        <AdminProductList />
        <AdminOrderList />
      </div> */}
      <AdminTable />
    </div>
  );
};

export default Page;
