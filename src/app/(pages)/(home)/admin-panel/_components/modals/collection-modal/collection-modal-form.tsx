"use client";

import { CategoryService } from "@/actions/category/category-service";
import { CollectionService } from "@/actions/collection/collection-service";
import { InputValidated } from "@/app/(pages)/auth/_components/input-validated";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  collectionId: string;
  collection: Collection;
}

export const CollectionModalForm: FC<IProps> = ({
  collectionId,
  collection,
}) => {
  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: CategoryService.getAll,
  });

  const queryClient = useQueryClient();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().min(1, "Это поле обязательно"),
    img: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      name: collection.name,
      img: collection.img,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: CollectionService.updateById,
    onSuccess: () => {
      toast.success("Коллекция успешно обновлена");
      queryClient.invalidateQueries({
        queryKey: ["admin-categories-list"],
        refetchType: "all",
      });
    },
    onError: () => {
      toast.error("Не удалось обновить коллекцию");
    },
  });

  const { mutateAsync: removeCategory, isPending: isPendingRemoveCategory } =
    useMutation({
      mutationFn: CollectionService.deleteById,
      onSuccess: () => {
        toast.success("Коллекция успешно удалена");
      },
      onError: () => {
        toast.error("Не удалось удалить коллекцию");
      },
    });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    if (!categoryId) return toast.error("Выберите категорию");

    await mutateAsync({
      ...data,
      collectionId,
      categoryId,
    });
  };

  const handleRemoveCategory = async () => {
    await removeCategory({
      collectionId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-3"
    >
      <InputValidated
        label="Название коллекции"
        register={register("name")}
        errors={errors.name?.message}
        placeholder="Название"
      />

      <InputValidated
        label="Ссылка на картинку"
        register={register("img")}
        errors={errors.img?.message}
        placeholder="https://"
      />

      <div className="grid lg:grid-cols-3 justify-items-center gap-2">
        {categories?.map((category) => (
          <div
            onClick={() => setCategoryId(category.id)}
            key={category.id}
            className={cn(
              "border text-center p-2 min-w-[100px] rounded-md cursor-pointer border-zinc-200 transition duration-300",
              {
                "border-primary bg-primary text-white":
                  categoryId === category.id,
                "hover:bg-zinc-200": categoryId !== category.id,
              }
            )}
          >
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : "Сохранить"}
        </Button>

        <Button
          onClick={handleRemoveCategory}
          variant={"destructive"}
          disabled={isPending}
          type="button"
          className="w-full"
        >
          {isPendingRemoveCategory ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Удалить"
          )}
        </Button>
      </div>
    </form>
  );
};
