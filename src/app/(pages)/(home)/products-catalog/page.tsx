import { NextPage } from "next";
import { ProductList } from "./_components/product-list";

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Page;
