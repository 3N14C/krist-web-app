const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="lg:max-w-[1600px] lg:mx-auto mt-32">{children}</div>;
};

export default Layout;
