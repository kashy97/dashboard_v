import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Page from "../components/Page";

const VAdd = () => {
  const [name, setName] = useState("");
  return (
    <Page title="Vendors | Add">
      <Container maxWidth="xl">
      <Box
          component="form"
          sx={{ paddingRight: 3, paddingLeft: 3 }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={5}>
            <Typography sx={{ paddingTop: 3, paddingLeft:3 }} variant="h4">Add Vendors</Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={() => setName(name)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="supplier_code"
                  label="Supplier Code"
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address 1"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address 2"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="zipcode"
                  label="Zip Code"
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="place"
                  label="Place"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2} md={6} xl={6}></Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" sx={{ maxWidth: 0.5 }}>
            SAVE
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default VAdd;
