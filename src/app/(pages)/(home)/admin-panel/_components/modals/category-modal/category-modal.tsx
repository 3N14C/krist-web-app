"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { CategoryModalForm } from "./category-modal-form";
import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "@/actions/category/category-service";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: string;
}

export const CategoryModal: FC<IProps> = ({ categoryId, open, setOpen }) => {
  const { data: category } = useQuery({
    queryKey: ["update-category-by-id", categoryId],
    queryFn: async () => await CategoryService.getById({ categoryId }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование категории {category?.name}</DialogTitle>
          <DialogDescription>
            Здесь вы можете редактировать категорию
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <CategoryModalForm categoryId={category?.id ?? ""} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
