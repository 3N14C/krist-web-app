import { NextPage } from "next";
import { ReviewProductList } from "./_components/review-product-list";
import { ShippingAddress } from "./_components/shipping-address";
import { PaymentMethod } from "./_components/payment-method";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="mt-10">
      <p className="text-3xl font-bold">
        Ожидаемое время дсотавки: {new Date().toLocaleDateString()}
      </p>

      <div className="">
        <ReviewProductList />
      </div>

      <div className="mt-10">
        <ShippingAddress />
      </div>

      <div className="mt-10">
        <PaymentMethod />
      </div>
    </div>
  );
};

export default Page;
