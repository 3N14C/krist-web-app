"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { AddCategoryModalForm } from "./add-category-modal-form";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCategoryModal: FC<IProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новую категорию</DialogTitle>
          <DialogDescription>
            Здесь вы можете создать новую категорию
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <AddCategoryModalForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
