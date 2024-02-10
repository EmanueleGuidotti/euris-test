import { useNavigate, useParams } from "react-router";
import { useGetStatsByStoreIdQuery } from "../../services/store.services";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useMemo } from "react";
import { Container, Button, CircularProgress } from "@mui/material";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const GraphPageContainer = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const {
    data: statsData,
    error: statsError,
    isLoading: statsLoading,
  } = useGetStatsByStoreIdQuery({ storeId }, { skip: !storeId });

  const labels = useMemo(
    () => !statsLoading && statsData?.map(({ category }) => category),
    [statsData]
  );

  const data = useMemo(
    () =>
      !statsLoading &&
      statsData?.map(({ numberOfProducts }) => numberOfProducts),
    [statsData]
  );

  const backgroundColor = useMemo(() => {
    let colors = [];
    for (let index = 0; index < statsData?.length; index++) {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
  }, [statsData]);

  const goBackHandler = () => navigate(-1);

  const dataSet = {
    labels,
    datasets: [
      {
        label: "Numero di prodotti",
        data,
        backgroundColor,
        borderWidth: 1,
      },
    ],
  };
  if (statsError)
    return (
      <Container maxWidth="sm">
        <p>Errore nella creazione dei dati. Per favore riprovare</p>
      </Container>
    );
  if (statsLoading)
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  return (
    <Container maxWidth="sm">
      <Button onClick={goBackHandler}>Indietro</Button>
      <PolarArea data={dataSet} />
    </Container>
  );
};

export { GraphPageContainer };
