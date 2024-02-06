import { useGetStoresQuery } from "../../services/store.services";
import { DashboardComponent } from "./dashboard.component";

const DashboardContainer = () => {
  const { data, error, isLoading } = useGetStoresQuery();

  if (!isLoading && !error) {
    return <DashboardComponent stores={data} />;
  } else return null;
};

export { DashboardContainer };
