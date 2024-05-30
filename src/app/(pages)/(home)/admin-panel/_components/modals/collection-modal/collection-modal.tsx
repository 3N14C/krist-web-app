"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "@/actions/category/category-service";
import { CollectionModalForm } from "./collection-modal-form";
import { CollectionService } from "@/actions/collection/collection-service";
import { Collection } from "@prisma/client";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collectionId: string;
}

export const CollectionModal: FC<IProps> = ({
  collectionId,
  open,
  setOpen,
}) => {
  const { data: collection } = useQuery({
    queryKey: ["update-category-by-id", collectionId],
    queryFn: async () => await CollectionService.getById({ collectionId }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование категории {collection?.name}</DialogTitle>
          <DialogDescription>
            Здесь вы можете редактировать категорию
          </DialogDescription>
        </DialogHeader>

        <div className="">
          <CollectionModalForm
            collection={collection ?? ({} as Collection)}
            collectionId={collection?.id ?? ""}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
