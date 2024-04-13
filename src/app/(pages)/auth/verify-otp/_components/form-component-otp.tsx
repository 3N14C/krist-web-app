"use client";

import { BackButton } from "@/components/ui/back-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FormTitle } from "../../_components/form-title";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  params?: {
    userEmail: string;
  };
}

export const FormComponentOtp: FC<Props> = ({ params }) => {
  const searchParams = useSearchParams();
  const otp = searchParams.get("otpcode");
  const userEmail = searchParams.get("userEmail");
  const router = useRouter();

  const schema = z.object({
    otp: z.string().min(6, { message: "Код должен быть не менее 6 символов" }),
  });

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = (data: z.infer<typeof schema>) => {
    if (data.otp === otp) {
      router.push(`/auth/reset-password?userEmail=${userEmail}`);
    } else {
      toast.error("Неверный код");
    }
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <BackButton />

      <FormTitle
        title="Enter OTP"
        subtitle={`We have share a code of your registered email address ${params?.userEmail}`}
        className="max-[639px]:text-center"
      />

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-[30px]"
      >
        <Controller
          name="otp"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputOTP
              onChange={onChange}
              // disabled={value.length >= 6}
              pattern={REGEXP_ONLY_DIGITS}
              maxLength={6}
              render={({ slots }) => (
                <>
                  <InputOTPGroup>
                    {slots.slice(0, 3).map((slot, index) => (
                      <InputOTPSlot
                        className="font-bold text-[24px]"
                        key={index}
                        {...slot}
                      />
                    ))}{" "}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {slots.slice(3).map((slot, index) => (
                      <InputOTPSlot
                        className="font-bold text-[24px]"
                        key={index}
                        {...slot}
                      />
                    ))}
                  </InputOTPGroup>
                </>
              )}
            />
          )}
        />

        <Button type="submit" className="py-[30px] w-full" size={"lg"}>
          Verify
        </Button>
      </form>
    </div>
  );
};
