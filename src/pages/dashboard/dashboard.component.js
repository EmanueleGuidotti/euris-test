import { useState } from "react";
import { SelectComponent } from "../../common/select";
import { useGetProductsByStoreIdQuery } from "../../services/store.services";
import { ProductComponent } from "../../common/product";
import PropTypes from "prop-types";
import { Button, Box, Container, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardComponent } from "../../common/card";
import GridViewIcon from "@mui/icons-material/GridView";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";

const DashboardComponent = ({ stores }) => {
  const [storeId, setStoreId] = useState("");
  const [gridLayout, setGridLayout] = useState(false);

  const navigate = useNavigate();

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsByStoreIdQuery({ id: storeId }, { skip: !storeId });

  const onChooseStoreHandler = (event) => {
    setStoreId(event.target.value);
  };

  const changeGridLayout = () => setGridLayout((l) => !l);

  const addProductHandler = () => {
    navigate(`/createProduct/${storeId}`);
  };

  const graphHandler = () => {
    navigate(`/graph/${storeId}`);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginBottom: "1em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <SelectComponent
          selectData={stores}
          selectName={"Scegli il negozio"}
          handleChange={onChooseStoreHandler}
          selectValue={storeId}
          fullWidth
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1em",
          }}
        >
          <Button
            variant="outlined"
            onClick={addProductHandler}
            disabled={!storeId}
          >
            Aggiungi prodotto
          </Button>
          <Button variant="outlined" onClick={graphHandler} disabled={!storeId}>
            Grafico
          </Button>
          <Button
            variant="outlined"
            onClick={changeGridLayout}
            disabled={!storeId}
          >
            {!gridLayout ? <GridViewIcon /> : <SplitscreenIcon />}
          </Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {!gridLayout && (
          <Grid container spacing={2}>
            {products?.map(({ data: { title, description, price }, id }) => (
              <Grid item xs={12} key={id}>
                <ProductComponent
                  title={title}
                  description={description}
                  price={price}
                  productId={id}
                  storeId={storeId}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {gridLayout && (
          <Grid container spacing={2}>
            {products?.map(({ data: { title, description, price }, id }) => (
              <Box sx={{ minWidth: 275, maxWidth: 275, margin: ".5%" }}>
                <CardComponent
                  title={title}
                  description={description}
                  price={price}
                  productId={id}
                  storeId={storeId}
                />
              </Box>
            ))}
          </Grid>
        )}
        {productsLoading && (
          <Grid container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </Grid>
        )}
        {productsError && (
          <Grid container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Errore nella ricerca dei dati, si prega di riprovare</p>
            </Box>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

DashboardComponent.propTypes = {
  stores: PropTypes.array,
};

export { DashboardComponent };
