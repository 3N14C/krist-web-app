import { Suspense } from "react";
import { BestSeller } from "./_components/sections/bestseller-section";
import { CollectionSection } from "./_components/sections/collection-section";
import { MainSection } from "./_components/sections/main-section";
import { DealsMonthSection } from "./_components/sections/delas-month-section";

export default function Home() {
  return (
    <div className="">
      <MainSection />

      <div className="mt-[100px]">
        <CollectionSection />
      </div>

      <div className="mt-[100px]">
        <Suspense fallback={<>Loading...</>}>
          <BestSeller />
        </Suspense>
      </div>

      <div className="mt-[100px]">
        <DealsMonthSection />
      </div>
    </div>
  );
}
