"use client";

import { AuthService } from "@/actions/user/auth/auth-service";
import { Button } from "@/components/ui/button";
import { userRegisterSchema } from "@/server/zod-validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormTitle } from "../../_components/form-title";
import { InputValidated } from "../../_components/input-validated";

export const FormComponentRegister: FC = () => {
  const router = useRouter();
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: AuthService.signUp,
    onSuccess: () => {
      toast.success("Вы успешно зарегистрировались");
      router.replace("/");
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
  } = useForm<z.infer<typeof userRegisterSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: z.infer<typeof userRegisterSchema>) => {
    try {
      await mutateAsync({
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <FormTitle title="Добро пожаловать" subtitle="Создание нового аккаунта" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[15px] mt-[30px]"
      >
        <InputValidated
          errors={errors.username?.message}
          register={register("username")}
          label="ИМя пользователя"
          placeholder="Example"
        />

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

        <Link className="text-end" href={"/auth/login"}>
          Уже есть аккаунт?
        </Link>

        <Button type="submit" className="text-base py-[30px]" size={"lg"}>
          {isPending ? (
            <div className="">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <>Создать аккаунт</>
          )}
        </Button>
      </form>
    </div>
  );
};
