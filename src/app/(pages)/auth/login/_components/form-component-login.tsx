"use client";

import { AuthService } from "@/actions/user/auth/auth-service";
import { Button } from "@/components/ui/button";
import { userLoginSchema } from "@/server/zod-validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormTitle } from "../../_components/form-title";
import { InputValidated } from "../../_components/input-validated";

export const FormComponentLogin: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.signIn,
    onSuccess: () => {
      toast.success("Аутентикация прошла успешно");
      router.replace(from ? from : "/");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof userLoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userLoginSchema),
  });

  const handleOnSubmit = async (data: z.infer<typeof userLoginSchema>) => {
    await mutateAsync(data, {});
  };

  return (
    <div className="">
      <FormTitle title="Добро пожаловать 👋" subtitle="Вход в аккаунт" />

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-[15px] mt-[30px]"
      >
        <InputValidated
          errors={errors.email?.message}
          register={register("email")}
          label="Почтовый адрес"
          placeholder="example@mail.ru"
        />

        <InputValidated
          errors={errors.password?.message}
          register={register("password")}
          label="Пароль"
          placeholder="******"
        />

        <div className="flex items-center justify-between">
          <Link className="" href={"/auth/register"}>
            Нет аккаунта?
          </Link>

          <Link className="" href={"/auth/forgot-password"}>
            Забыли пароль?
          </Link>
        </div>

        <Button type="submit" className="text-base py-[30px]" size={"lg"}>
          {isPending ? <Loader2 className="animate-spin" /> : "Войти"}
        </Button>
      </form>
    </div>
  );
};
