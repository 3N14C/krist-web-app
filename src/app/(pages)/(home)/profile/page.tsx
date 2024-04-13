import { NextPage } from "next";
import { ProfileMenu } from "./_components/profile-menu";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <ProfileMenu />
    </div>
  );
};

export default Page;
