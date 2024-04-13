"use client";

import { Button } from "@/components/ui/button";
import { userLoginSchema } from "@/server/zod-validators/user.validator";
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

export const FormComponentLogin: FC = () => {
  const { mutateAsync, isLoading } = trpc.authUser.loginUser.useMutation();
  const router = useRouter();

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
    try {
      await mutateAsync(data, {
        onSuccess: () => {
          toast.success("Аутентикация прошла успешно");
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
      <FormTitle
        // className="max-[639px]:text-center"
        title="Welcome 👋"
        subtitle="Please login here"
      />

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-[15px] mt-[30px]"
      >
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

        <div className="flex items-center justify-between">
          <Link className="" href={"/auth/register"}>
            Don't have an account?
          </Link>

          <Link className="" href={"/auth/forgot-password"}>
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="text-base py-[30px]" size={"lg"}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </div>
  );
};
