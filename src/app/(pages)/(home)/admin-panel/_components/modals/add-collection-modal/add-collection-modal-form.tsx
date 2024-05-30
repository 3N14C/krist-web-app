"use client";

import { CollectionService } from "@/actions/collection/collection-service";
import { InputValidated } from "@/app/(pages)/auth/_components/input-validated";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddCollectionModalForm: FC = () => {
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
    mutationFn: CollectionService.create,
    onSuccess: () => {
      toast.success("Коллекция успешно создана");
      queryClient.invalidateQueries({
        queryKey: ["admin-collection-list"],
        refetchType: "all",
      });
    },
    onError: () => {
      toast.error("Не удалось создать коллекцию");
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    await mutateAsync({
      ...data,
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

      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? <Loader2 className="animate-spin" /> : "Создать"}
      </Button>
    </form>
  );
};
