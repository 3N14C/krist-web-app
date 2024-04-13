import { NextPage } from "next";
import { AddressList } from "./_components/address-list";
import { ModalAddress } from "./_components/modal";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <ModalAddress />

      <div className="mt-10">
        <AddressList />
      </div>
    </div>
  );
};

export default Page;
