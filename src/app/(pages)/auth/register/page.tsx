import { NextPage } from "next";
import { ImageSide } from "../_components/image-side";
import { FormComponentRegister } from "./_components/form-component-register";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <div className="flex items-center gap-12 max-[639px]:justify-center max-[639px]:h-screen">
        <div className="max-[639px]:hidden">
          <ImageSide imageSrc="registerImage" />
        </div>

        <FormComponentRegister />
      </div>
    </div>
  );
};

export default Page;
