import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NextPage } from "next";
import { AddItemButton } from "../_components/add-item-button";
import { ModalCard } from "./_components/modal";
import { CardList } from "./_components/card-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <ModalCard />

      <div className="mt-10">
        <CardList />
      </div>
    </div>
  );
};

export default Page;
