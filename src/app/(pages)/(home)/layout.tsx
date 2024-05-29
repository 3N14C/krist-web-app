import { Header } from "@/components/header/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:px-[60px] px-10 py-[30px]">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
