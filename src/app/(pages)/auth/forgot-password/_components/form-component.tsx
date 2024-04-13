"use client";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormTitle } from "../../_components/form-title";
import { InputValidated } from "../../_components/input-validated";

export const FormComponent: FC = () => {
  const { data: user, isLoading } = trpc.authUser.getUserSession.useQuery();
  const router = useRouter();
  const otp = Math.floor(100000 + Math.random() * 900000);

  const schema = z.object({
    email: z.string().email({ message: "Некорректная почта" }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, otp: otp }),
      });

      if (response.ok) {
        toast.success("КОд для сброса пароля отправлен на вашу почту");
        console.log(response);
      } else {
        toast.error("Error sending email");
      }

      router.push(`/auth/verify-otp?otpcode=${otp}&userEmail=${data.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <BackButton />

      <FormTitle
        title="Forgot Password"
        subtitle="Enter your registered email address. we’ll send you a code to reset your password."
      />

      <form
        className="flex flex-col gap-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputValidated
          errors={errors.email?.message}
          label="Email Address"
          placeholder="example@mail.ru"
          register={register("email")}
        />

        <Button
          onClick={() => {}}
          type="submit"
          className="w-full py-[30px]"
          size={"lg"}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Send OTP"}
        </Button>
      </form>
    </div>
  );
};
