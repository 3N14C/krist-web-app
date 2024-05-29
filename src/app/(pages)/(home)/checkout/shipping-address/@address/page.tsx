import { NextPage } from "next";
import { AddressModalForm } from "../../../profile/@addresses/_components/address-modal-form";
import { AddressList } from "./_components/address-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4">
        <p className="lg:text-2xl font-bold">Выберите адрес доставки</p>
        <p className="text-lg lg:w-[900px]">
          Адрес, который вы хотели бы использовать, указан ниже? Если да,
          нажмите соответствующую кнопку «Доставить на этот адрес». Или вы
          можете ввести новый адрес доставки.
        </p>
      </div>

      <div className="mt-5">
        <AddressList />
      </div>

      <hr className="my-10" />

      <div className="">
        <p className="lg:text-2xl font-bold mb-5">Добавить новый адрес</p>

        <AddressModalForm buttonClassName="py-8 w-1/3 mt-5" />
      </div>
    </div>
  );
};

export default Page;
