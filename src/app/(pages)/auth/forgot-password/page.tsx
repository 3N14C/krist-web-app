import { NextPage } from "next";
import { ImageSide } from "../_components/image-side";
import { FormComponent } from "./_components/form-component";
import { sendMail } from "@/lib/send-mail";
import { Button } from "@/components/ui/button";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex items-center gap-12 max-[639px]:justify-center max-[639px]:h-screen max-[639px]:px-[30px]">
      <div className="max-[639px]:hidden">
        <ImageSide imageSrc="passwordImage" />
      </div>

      <FormComponent />
    </div>
  );
};

export default Page;
