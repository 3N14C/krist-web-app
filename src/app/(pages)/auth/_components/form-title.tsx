import { FC } from "react";

interface Props {
  title: string;
  subtitle: string;
  className?: string;
}

export const FormTitle: FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className={className}>
      <p className="font-bold text-[30px]">{title}</p>

      <p className="text-base text-[#A4A1AA] max-w-[445px] ">{subtitle}</p>
    </div>
  );
};
