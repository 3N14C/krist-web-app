import { NextPage } from "next";
import { FormComponentLogin } from "./_components/form-component-login";
import { ImageSide } from "../_components/image-side";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <div className="flex items-center gap-12 max-[639px]:justify-center max-[639px]:h-screen">
        <div className="max-[639px]:hidden">
          <ImageSide imageSrc="loginImage" />
        </div>

        <FormComponentLogin />
      </div>
    </div>
  );
};

export default Page;
