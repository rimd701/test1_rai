import { Footer, Header } from "../components/common";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        {children}
        <Footer />
      </div>
  );
};

export const withMainLayout =
  (Page: React.FC): React.FC =>
  () => {
    return (
      <MainLayout>
        <Page />
      </MainLayout>
    );
  };
