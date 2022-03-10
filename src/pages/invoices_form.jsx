import {
  Box,
  Button,
  Divider,
  MenuItem,
  Grid,
  Stack,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Page from "../components/Page";

const vendors = [
  {
    value: "a",
    label: "a",
  },
  {
    value: "b",
    label: "b",
  },
];

const vat_percent = [
  {
    value: "0",
    label: "0%",
  },
  {
    value: "14",
    label: "14%",
  },
  {
    value: "25",
    label: "25%",
  },
];
const IAdd = () => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [vatrate, setVatrate] = useState(0);
  const [gross, setGross] = useState(0);
  const [vat, setVat] = useState(0);

  const changeQuantity = (e) => {
    setQuantity(Number(e.target.value));
  };
  const changePrice = (e) => {
    setPrice(Number(e.target.value));
  };
  const changeVatrate = (e) => {
    setVatrate(Number(e.target.value));
  };

  const qtClick = () => {
    setQuantity('')
  }
  const priceClick = () => {
    setPrice('')
  }
  useEffect(() => {
    const percent = vatrate / 100;
    const total = quantity * price;
    setVat(Math.round(total * percent));
    setGross(vat + total);
  }, [vatrate, quantity, price, vat]);

  return (
    <Page title="Invoices | Add">
      <Container maxWidth="xl">
        <Box
          component="form"
          sx={{ paddingRight: 5, paddingLeft: 5 }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={2}>
            <Typography sx={{ paddingTop: 5, paddingBottom: 5 }} variant="h4">
              Add Purchase Order
            </Typography>
            <Typography variant="h6">Vendor</Typography>
            <TextField
              id="vendor"
              label="Vendor"
              select
              helperText="Please select vendor"
              variant="outlined"
            >
              {vendors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="h6">Items</Typography>
            <Grid container spacing={2} sx={{ pr: 5 }}>
              <Grid item xs={6} md={6} xl={4}>
                <TextField
                  fullWidth
                  id="title"
                  label="Title"
                  type="text"
                  variant="outlined"
                /></Grid>
              <Grid item xs={6} md={6} xl={4}><TextField
                fullWidth
                id="price"
                label="Price"
                type="number"
                variant="outlined"
                onClick={priceClick}
                value={price}
                onChange={changePrice}
              /></Grid>
              <Grid item xs={6} md={6} xl={4}><TextField
                fullWidth
                id="quantity"
                label="Quantity"
                type="number"
                variant="outlined"
                onClick={qtClick}
                value={quantity}
                onChange={changeQuantity}
                defaultValue="1"
              /></Grid>
              <Grid item xs={6} md={6} xl={4}><TextField
                id="vat"
                fullWidth
                select
                label="Vat Rate"
                variant="outlined"
                value={vatrate}
                onChange={changeVatrate}
              >
                {vat_percent.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField></Grid>
              <Grid item xs={6} md={6} xl={4}><TextField
                fullWidth
                id="gross"
                label="Gross Amount"
                type="number"
                variant="outlined"
                value={gross}
                disabled
              /></Grid>
            </Grid>
            {/* <Button sx={{ maxWidth: 8 }} size="medium" variant="outlined">
            +
          </Button> */}
            <TextField
              id="sender"
              label="Sender Reference"
              type="text"
              variant="outlined"
            />
            <br />
            <Divider />
            <br />
            <Typography variant="h6">Total</Typography>
            <Stack spacing={1}>
              {/* <Typography>Net Amount: {}</Typography> */}
              <Typography>Vat Amount: {vat}</Typography>
              <Typography>Gross Amount: {gross}</Typography>
            </Stack>
          </Stack>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" size="large" sx={{ maxWidth: 0.5 }}>
              SUBMIT
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default IAdd;
