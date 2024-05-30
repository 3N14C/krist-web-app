"use client";

import { ServiceService } from "@/actions/service/service";
import { InputValidated } from "@/app/(pages)/auth/_components/input-validated";
import { Button } from "@/components/ui/button";
import { CustomTitle } from "@/components/ui/custom-title";
import { useSession } from "@/hooks/use-session";
import { customOrderServiceSchema } from "@/server/zod-validators/post-custom-order-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormOrderService: FC = () => {
  const { user } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof customOrderServiceSchema>>({
    resolver: zodResolver(customOrderServiceSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ServiceService.createUserService,
    onSuccess: () => {
      reset();
      toast.success("Ваша заявка успешно отправлена");
    },
  });

  const handleOnSubmit = async (
    data: z.infer<typeof customOrderServiceSchema>
  ) => {
    if (!user) {
      toast.error("Вы должны быть авторизованы");
      router.replace("/auth/login?from=/services");
      return;
    }

    await mutateAsync({
      userId: user.id,
      message: data.message,
      title: data.title,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleOnSubmit(data))}
      className="flex flex-col gap-10"
    >
      <CustomTitle title="Вы также можете оставить свою заявку" />

      <InputValidated
        label="Заголовок"
        placeholder="Заголовок"
        register={register("title")}
        errors={errors.title?.message}
        className="w-full"
      />

      <InputValidated
        label="Сообщение"
        placeholder="Сообщение"
        register={register("message")}
        errors={errors.message?.message}
        className="w-full"
      />

      <Button type="submit" className="py-9 text-xl">
        {isPending ? <Loader2 className="animate-spin" /> : "Отправить заявку"}
      </Button>
    </form>
  );
};
