import { useGetStoresQuery } from "../../services/store.services";

const DashboardContainer = () => {
  const { data, error, isLoading } = useGetStoresQuery();

  if (!isLoading) console.log(data);

  return null;
};

export { DashboardContainer };
