"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FC } from "react";
import { AddressModalForm } from "./address-modal-form";

interface IProps {}

export const ModalAddress: FC<IProps> = ({}) => {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="py-9 px-20 flex items-center gap-5">
            <Plus /> <p className="capitalize text-lg">Добавить новый адрес</p>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Добавить новый адрес</DialogTitle>
          </DialogHeader>

          <AddressModalForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
