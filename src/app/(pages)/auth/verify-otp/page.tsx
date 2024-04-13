import { NextPage } from "next";
import { ImageSide } from "../_components/image-side";
import { FormComponentOtp } from "./_components/form-component-otp";

interface Props {
  searchParams: {
    userEmail: string;
  };
}

const Page: NextPage<Props> = async ({ searchParams }) => {
  return (
    <div className="flex items-center gap-12 max-[639px]:justify-center max-[639px]:h-screen max-[639px]:px-[30px]">
      <div className="max-[639px]:hidden">
        <ImageSide imageSrc="otpImage" />
      </div>

      <FormComponentOtp params={searchParams} />
    </div>
  );
};

export default Page;
