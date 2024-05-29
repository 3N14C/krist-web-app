import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errors: any;
  className?: string;
  labelClassName?: string;
}

export const InputValidated: FC<Props> = ({
  placeholder,
  register,
  label,
  errors,
  className,
  labelClassName,
}) => {
  return (
    <div className="">
      <p className={cn("text-[12px]", labelClassName)}>{label}</p>
      <Input
        placeholder={placeholder}
        className={cn(
          "w-[445px] max-[639px]:w-[250px] px-[15px] py-[28px]",
          className,
          {
            "border-red-500": errors,
          }
        )}
        {...register}
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};
