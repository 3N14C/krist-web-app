import { NextPage } from "next";
import { ProductTable } from "./_components/product-table";
import { CustomTitle } from "@/components/ui/custom-title";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <CustomTitle title="Подтвердите заказ" />

      <div className="mt-10">
        <ProductTable />
      </div>
    </div>
  );
};

export default Page;
