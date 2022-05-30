import Axios from 'axios';
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
  const [supplier_code,setSupplier] =useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [address_1, setAddress1] = useState("");
  const [address_2, setAddress2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [contact_person, setContact] = useState("");
  const [contact_reference, setRef] = useState("");

  const handleSave=()=>{
    Axios.post("https://poorvikadashboard.herokuapp.com/api/v1/vendor", {
      Supplier_code: supplier_code,
      name: name,
      email: email,
      phone: phone_number,
      address1: address_1,
      address2: address_2,
      zipcode: zipcode,
      city: city,
      state: state,
      country: country,
      contact_person: contact_person,
      contact_reference: contact_reference, 
    }).then((response)=>{
      console.log('details entered',response)
    })
  };
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
                  id="Supplier_code"
                  label="Supplier Code"
                  type="number"
                  onChange={() => setSupplier(name)}
                  variant="outlined"
                />
              </Grid>
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
                  id="phone_number"
                  label="Phone Number"
                  onChange={() => setPhone(name)}
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
                  onChange={() => setEmail(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address 1"
                  type="text"
                  onChange={() => setAddress1(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address 2"
                  type="text"
                  onChange={() => setAddress2(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  type="text"
                  onChange={() => setCity(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  type="text"
                  onChange={() => setState(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  type="text"
                  onChange={() => setCountry(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="zipcode"
                  label="Zip Code"
                  type="number"
                  onChange={() => setZipcode(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="contact_person"
                  label="Contact Person"
                  type="text"
                  onChange={() => setContact(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="contact_reference"
                  label="Contact Reference"
                  type="text"
                  onChange={() => setRef(name)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2} md={6} xl={6}></Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" onClick={handleSave} sx={{ maxWidth: 0.5 }}>
            SAVE
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default VAdd;
