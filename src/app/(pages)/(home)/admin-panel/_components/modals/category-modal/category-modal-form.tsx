"use client";

import { CategoryService } from "@/actions/category/category-service";
import { InputValidated } from "@/app/(pages)/auth/_components/input-validated";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  categoryId: string;
}

export const CategoryModalForm: FC<IProps> = ({ categoryId }) => {
  const queryClient = useQueryClient();

  const schema = z.object({
    name: z.string().min(1, "Это поле обязательно"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: CategoryService.updateById,
    onSuccess: () => {
      toast.success("Категория успешно обновлена");
      queryClient.invalidateQueries({
        queryKey: ["admin-categories-list"],
        refetchType: "all",
      });
    },
    onError: () => {
      toast.error("Не удалось обновить категорию");
    },
  });

  const { mutateAsync: removeCategory, isPending: isPendingRemoveCategory } =
    useMutation({
      mutationFn: CategoryService.deleteById,
      onSuccess: () => {
        toast.success("Категория успешно удалена");
      },
      onError: () => {
        toast.error("Не удалось удалить категорию");
      },
    });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    await mutateAsync({
      ...data,
      categoryId,
    });
  };

  const handleRemoveCategory = async () => {
    await removeCategory({
      categoryId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-3"
    >
      <InputValidated
        label="Название категории"
        register={register("name")}
        errors={errors.name?.message}
        placeholder="Название"
      />

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
