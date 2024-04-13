import { NextPage } from "next";
import { CardList } from "./_components/card-list";
import { CardModalForm } from "../../../profile/@cards/_components/card-modal-form";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">Выберите способ оплаты</p>
        <p className="text-lg w-[900px]">
          Оплата, которую вы хотели бы использовать, указан ниже? Если да,
          нажмите соответствующую кнопку «Использовать эту карту». Или вы можете
          добавить новую карту.
        </p>
      </div>

      <div className="mt-5">
        <CardList />
      </div>

      <hr className="my-10" />

      <div className="">
        <p className="text-2xl font-bold mb-5">Добавить новую карту</p>

        <CardModalForm buttonClassName="py-8 w-1/3 mt-5" />
      </div>
    </div>
  );
};

export default Page;
