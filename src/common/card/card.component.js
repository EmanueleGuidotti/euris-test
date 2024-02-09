import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CardComponent = ({ title, price, description, productId, storeId }) => {
  const navigate = useNavigate();

  const goToDetailHandler = (event) => {
    event.preventDefault();
    navigate(`/${storeId}/${productId}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <EuroIcon />
          {price}
        </Typography>
        <Typography variant="body2" noWrap>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={goToDetailHandler}>
          Dettaglio
        </Button>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  productId: PropTypes.string,
  storeId: PropTypes.string,
};

export { CardComponent };
