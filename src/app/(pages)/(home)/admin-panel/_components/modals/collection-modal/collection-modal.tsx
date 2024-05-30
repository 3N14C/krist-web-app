"use client";

import { CollectionService } from "@/actions/collection/collection-service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collection } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { CollectionModalForm } from "./collection-modal-form";

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
