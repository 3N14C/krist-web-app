import { NextPage } from "next";
import { ProductTable } from "./_components/product-table";
import { CustomTitle } from "@/components/ui/custom-title";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <ProductTable />
    </div>
  );
};

export default Page;
