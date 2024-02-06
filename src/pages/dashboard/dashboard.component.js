import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Select } from "../../common/select";

const DashboardComponent = ({ stores }) => {
  const [storeId, setStoreId] = useState("");

  const onChooseStore = (event) => {
    setStoreId(event.target.value);
  };

  useEffect(() => {
    console.log(storeId);
  }, [storeId]);

  return (
    <Container maxWidth="sm">
      <Select
        selectData={stores}
        selectName={"Choose the store"}
        handleChange={onChooseStore}
        selectValue={storeId}
      />
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />;
    </Container>
  );
};

export { DashboardComponent };
