import { HomeContainer }  from "../containers";
import { withMainLayout } from "../layout/MainLayout";

export const HomePage: React.FC = withMainLayout(() => {
  return <HomeContainer />;
});
