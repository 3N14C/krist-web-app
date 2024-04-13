import { NextPage } from "next";
import { OrderProductList } from "./_components/order-product-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="">
        <OrderProductList />
      </div>
    </div>
  );
};

export default Page;
