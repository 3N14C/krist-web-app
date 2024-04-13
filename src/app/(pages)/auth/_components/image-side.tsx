import { Logo } from "@/components/ui/logo";
import Image from "next/image";
import { FC } from "react";

interface Props {
  imageSrc: string;
}

export const ImageSide: FC<Props> = ({ imageSrc }) => {
  return (
    <div className="">
      <Image
        src={`/auth/${imageSrc}.jpg`}
        alt={`${imageSrc}`}
        width={1000}
        height={1000}
        className="w-2/2 h-screen"
      />
      <Logo className="absolute top-[60px] left-[60px]" />
    </div>
  );
};
