import { useParams } from "react-router";
import {
  useDeleteProductFromStoreMutation,
  useGetProductByProductIdQuery,
} from "../../services/store.services";
import {
  Container,
  Box,
  Grid,
  Paper,
  CircularProgress,
  styled,
  Button,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import { useNavigate } from "react-router-dom";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const ProductDetailContainer = () => {
  const { productId, storeId } = useParams();
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductFromStoreMutation();
  const { data, error, isLoading } = useGetProductByProductIdQuery(
    { productId, storeId },
    { skip: !productId || !storeId }
  );

  const goBackHandler = () => navigate(-1);

  const deleteProductHandler = async () => {
    try {
      const response = await deleteProduct({ storeId, productId });
      if (!response?.data) return navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading)
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container maxWidth="sm">
        <p>Errore nella ricerca dei dati, si prega di riprovare</p>
      </Container>
    );
  return (
    <Container maxWidth="sm">
      <Button onClick={goBackHandler}>Indietro</Button>
      <Paper>
        <Item sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <h1>{data?.title}</h1>
            </Grid>
            <Grid item xs={4}>
              <p style={{ textAlign: "right" }}>
                <EuroIcon />
                {data?.price}
              </p>
            </Grid>
            <Grid item xs={12}>
              <small>Descrizione:</small>
              <p>{data?.description}</p>
            </Grid>
            <Grid item xs={6}>
              <small>Categoria:</small>
              <p>{data?.category}</p>
            </Grid>
            <Grid item xs={6}>
              <small>Pasticcere:</small>
              <p>{data?.employee}</p>
            </Grid>
            {data?.reviews?.map((review) => (
              <Grid item xs={12} key={review}>
                <small>Recensione:</small>
                <p>{review}</p>
              </Grid>
            ))}
            <Grid item xs={12} style={{ textAlign: "right" }}>
              <Button
                onClick={deleteProductHandler}
                variant="outlined"
                color="error"
              >
                Elimina
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Paper>
    </Container>
  );
};

export { ProductDetailContainer };
