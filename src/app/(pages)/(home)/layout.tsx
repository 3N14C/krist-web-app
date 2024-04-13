import { Header } from "@/components/header/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-[60px] py-[30px]">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
