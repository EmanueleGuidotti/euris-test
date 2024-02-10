import { useGetStoresQuery } from "../../services/store.services";
import { DashboardComponent } from "./dashboard.component";
import { CircularProgress } from "@mui/material";

const DashboardContainer = () => {
  const { data, error, isLoading } = useGetStoresQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Errore nella ricerca dei dati, si prega di riprovare</p>;
  return <DashboardComponent stores={data} />;
};

export { DashboardContainer };
