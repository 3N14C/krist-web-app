"use client";

import { NextPage } from "next";
import { FormEditProfile } from "./_components/form-edit-profile";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <FormEditProfile />
    </div>
  );
};

export default Page;
