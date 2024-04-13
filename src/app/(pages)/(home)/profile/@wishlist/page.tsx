import { NextPage } from "next";
import { WishlistProductList } from "./_components/wishlist-product-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="w-[1250px]">
      <WishlistProductList />
    </div>
  );
};

export default Page;
