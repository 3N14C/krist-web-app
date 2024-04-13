import { NextPage } from "next";
import { NotificationList } from "./_components/notification-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <NotificationList />
    </div>
  );
};

export default Page;
