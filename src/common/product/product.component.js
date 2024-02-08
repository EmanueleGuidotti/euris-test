import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import EuroIcon from "@mui/icons-material/Euro";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const ProductComponent = ({
  title,
  price,
  description,
  productId,
  storeId,
}) => {
  const navigate = useNavigate();

  const goToDetail = (event) => {
    event.preventDefault();
    navigate(`/${storeId}/${productId}`);
  };

  return (
    <Item>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h3>{title}</h3>
          </Grid>
          <Grid item xs={2}>
            <p style={{ textAlign: "right" }}>
              <EuroIcon />
              {price}
            </p>
          </Grid>
          <Grid item xs={12}>
            <small>Descrizione:</small>
            <p>{description}</p>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button onClick={goToDetail} variant="contained">
              Dettaglio
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Item>
  );
};

ProductComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  productId: PropTypes.string,
  storeId: PropTypes.string,
};

export { ProductComponent };
