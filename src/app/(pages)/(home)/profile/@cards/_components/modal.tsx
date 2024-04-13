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
import { CardModalForm } from "./card-modal-form";

interface IProps {}

export const ModalCard: FC<IProps> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-9 px-20 flex items-center gap-5">
          <Plus /> <p className="capitalize text-lg">Добавить новую карту</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Добавить новую карту</DialogTitle>
        </DialogHeader>

        <CardModalForm />
      </DialogContent>
    </Dialog>
  );
};
