"use client";

import { Button } from "@/components/ui/button";
import { userRegisterSchema } from "@/server/zod-validators/user.validator";
import { trpc } from "@/trpc-client/client";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const { mutateAsync, isLoading } = trpc.authUser.registerUser.useMutation();
  const router = useRouter();

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
      await mutateAsync(data, {
        onSuccess: () => {
          toast.success("Вы успешно зарегистрировались");
          router.replace("/");
        },

        onError: (error) => {
          toast.error(error.message);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <FormTitle title="Welcome" subtitle="Please login here" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[15px] mt-[30px]"
      >
        <InputValidated
          errors={errors.username?.message}
          register={register("username")}
          label="Username"
          placeholder="John Doe"
        />

        <InputValidated
          errors={errors.email?.message}
          register={register("email")}
          label="Email Address"
          placeholder="example@mail.ru"
        />

        <InputValidated
          errors={errors.password?.message}
          register={register("password")}
          label="Password"
          placeholder="Password"
        />

        <Link className="text-end" href={"/auth/login"}>
          Already have an account?
        </Link>

        <Button type="submit" className="text-base py-[30px]" size={"lg"}>
          {isLoading ? (
            <div className="">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <>Register</>
          )}
        </Button>
      </form>
    </div>
  );
};
