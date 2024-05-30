"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { AddCollectionModalForm } from "./add-collection-modal-form";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCollectionModal: FC<IProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новую коллекцию</DialogTitle>
          <DialogDescription>
            Здесь вы можете создать новую коллекцию
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <AddCollectionModalForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
