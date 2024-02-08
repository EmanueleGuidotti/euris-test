import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { SelectComponent } from "../../common/select";
import { useGetProductsByStoreIdQuery } from "../../services/store.services";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { ProductComponent } from "../../common/product";
import PropTypes from "prop-types";

const DashboardComponent = ({ stores }) => {
  const [storeId, setStoreId] = useState("");

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsByStoreIdQuery({ id: storeId }, { skip: !storeId });

  const onChooseStoreHandler = (event) => {
    setStoreId(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginBottom: "1em" }}>
        <SelectComponent
          selectData={stores}
          selectName={"Scegli il negozio"}
          handleChange={onChooseStoreHandler}
          selectValue={storeId}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
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
          {productsLoading && (
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
          )}
          {productsError && (
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
          )}
        </Grid>
      </Box>
    </Container>
  );
};

DashboardComponent.propTypes = {
  stores: PropTypes.array,
};

export { DashboardComponent };
