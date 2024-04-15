import { FC } from "react";
import { CategoryScroll } from "./_components/category-scroll";
import { MobileColorFilter } from "./_components/mobile-filters/mobile-color-filter";
import { MobileSizeFilter } from "./_components/mobile-filters/mobile-filter-size";

export const MobileLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="">
      <CategoryScroll />

      <div className="flex items-center justify-between">
        <MobileColorFilter />
        <MobileSizeFilter />
      </div>

      <div className="">{children}</div>
    </div>
  );
};
