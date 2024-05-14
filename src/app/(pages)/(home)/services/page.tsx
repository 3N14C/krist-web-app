import { CustomTitle } from "@/components/ui/custom-title";
import { NextPage } from "next";
import { CreateService } from "./_components/create-service";
import { ServiceList } from "./_components/services-list";
import { FormOrderService } from "./_components/form-order-service";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="mt-[100px]">
      {/* <CustomTitle title="Добавить услугу" />

      <CreateService /> */}

      <div className="mt-[100px]">
        <CustomTitle title="Наши услуги" />

        <div className="mt-10">
          <ServiceList />
        </div>

        <div className="mt-[100px]">
          <FormOrderService />
        </div>
      </div>
    </div>
  );
};

export default Page;
