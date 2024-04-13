import { Breadcrumbs } from "@/components/breadcrumbs";
import { NextPage } from "next";
import { ProductPage } from "./_components/product";
import { RelatedProducts } from "./_components/related-products";
import { ServicesList } from "./_components/services-list";

interface Props {
  params: { collectionId: string; productId: string };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div>
      <ProductPage productId={params.productId} />

      <div className="mt-20">
        <RelatedProducts
          collectionId={params.collectionId}
          productId={params.productId}
        />
      </div>

      <div className="mt-20">
        <ServicesList />
      </div>
    </div>
  );
};

export default Page;
