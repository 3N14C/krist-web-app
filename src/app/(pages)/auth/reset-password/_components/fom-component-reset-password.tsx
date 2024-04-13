"use client";

import { BackButton } from "@/components/ui/back-button";
import { FC } from "react";
import { FormTitle } from "../../_components/form-title";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputValidated } from "../../_components/input-validated";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const FormComponentResetPassword: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userEmail = searchParams.get("userEmail");
  const { mutateAsync, isLoading } =
    trpc.authUser.changeUserPassword.useMutation();

  const schema = z.object({
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await mutateAsync(
      { email: userEmail!, password: data.password },
      {
        onSuccess: () => {
          toast.success("Пароль успешно изменен");
          router.replace("/auth/login");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <BackButton />

      <FormTitle
        title="Reset Your Password"
        subtitle="Enter your new password"
      />

      <form
        className="flex flex-col gap-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputValidated
          errors={errors.password?.message}
          label="Password"
          placeholder="example"
          register={register("password")}
        />

        <Button
          onClick={() => {}}
          type="submit"
          className="w-full py-[30px]"
          size={"lg"}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Change your password"
          )}
        </Button>
      </form>
    </div>
  );
};
