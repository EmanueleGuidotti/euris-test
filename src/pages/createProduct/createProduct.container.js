import { useState } from "react";
import Container from "@mui/material/Container";
import { Box, Grid, TextField, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Alert, Button } from "@mui/material";
import { useAddProductToStoreMutation } from "../../services/store.services";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const formData = {
  title: "",
  price: 0,
  description: "",
  category: "",
  employee: "",
  reviews: [],
};

const CreateProductContainer = () => {
  const [reviewValue, setReviewValue] = useState("");
  const [formValues, setFormValues] = useState(formData);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const navigate = useNavigate();
  const { storeId } = useParams();
  const [saveData] = useAddProductToStoreMutation();
  const { title, price, description, category, employee, reviews } = formValues;

  const goBackHandler = () => navigate(-1);

  const reviewChangeHandler = (event) => {
    setReviewValue(event.target.value);
  };

  const addReviewToReviews = () => {
    setFormValues((values) => ({
      ...values,
      reviews: [...values.reviews, reviewValue],
    }));
    setReviewValue("");
  };

  const formChangeHandler = (event) => {
    setFormValues((values) => ({
      ...values,
      [event.target.name]:
        event.target.name === "price"
          ? parseInt(event.target.value)
          : event.target.value,
    }));
  };

  const disableSubmit = () => {
    if (!title || !description || !category || !employee || price === 0) {
      return true;
    } else return false;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await saveData({ storeId, body: formValues });
      console.log(response);
      if (response) {
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 4500);
        setFormValues(formData);
        setReviewValue("");
      }
    } catch (e) {
      console.log(e);
      if (e) {
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 4500);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      {showSuccessAlert && (
        <Alert variant="filled" severity="success">
          Prodotto aggiunto con successo
        </Alert>
      )}
      {showErrorAlert && (
        <Alert variant="filled" severity="error">
          Errore nell'aggiunta del prodotto. Si prega di riprovare
        </Alert>
      )}
      <Button onClick={goBackHandler}>Indietro</Button>
      <Paper>
        <form onSubmit={onSubmitHandler}>
          <Item sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Titolo"
                  variant="outlined"
                  name="title"
                  fullWidth
                  value={title}
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Prezzo"
                  variant="outlined"
                  name="price"
                  type="number"
                  fullWidth
                  value={price}
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descrizione"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={10}
                  fullWidth
                  value={description}
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Categoria"
                  variant="outlined"
                  name="category"
                  fullWidth
                  value={category}
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pasticcere"
                  variant="outlined"
                  name="employee"
                  fullWidth
                  value={employee}
                  onChange={formChangeHandler}
                />
              </Grid>
              {reviews.map((review) => (
                <Grid item key={review} xs={12}>
                  <p>{review}</p>
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  label="Recensione"
                  variant="outlined"
                  style={{ width: "80%" }}
                  value={reviewValue}
                  onChange={reviewChangeHandler}
                />
                <Button
                  variant="outlined"
                  style={{ marginLeft: "5%" }}
                  onClick={addReviewToReviews}
                >
                  +
                </Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="success"
                  disabled={disableSubmit()}
                >
                  Salva
                </Button>
              </Grid>
            </Grid>
          </Item>
        </form>
      </Paper>
    </Container>
  );
};

export { CreateProductContainer };
