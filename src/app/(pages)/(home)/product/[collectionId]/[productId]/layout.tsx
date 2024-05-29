interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return <div className="lg:px-10">{children}</div>;
};

export default Layout;
