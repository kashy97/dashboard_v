import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Page from "../components/Page";

const edition = [
  {
    value: "null",
    label: "null",
  },
];
const vendor_cat = [
  {
    value: "null",
    label: "null",
  },
];
const vendor_name = [
  {
    value: "null",
    label: "null",
  },
];
const billing_address = [
  {
    value: "chennai",
    label: "Chennai",
  },
  {
    value: "bangalore",
    label: "Bangalore",
  },
];
const ROrders = () => {
  const [ro_value, setRovalue] = React.useState(null);
  const [pub_value, setPubvalue] = React.useState(null);
  const [gross, setGross] = React.useState(0);
  const [gst, setGst] = React.useState(0);
  const [gsta, setGsta] = React.useState(0);
  const [net, setNet] = React.useState(0);

  const changeGross = (e) => {
    setGross(Number(e.target.value));
  };

  const changeGst = (e) => {
    setGst(Number(e.target.value));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    // code to run when state changes
    const percent = gst / 100;
    setGsta(gross * percent);
    setNet(gsta + gross);
  });

  const handleChange = () => {
    console.log("working");
  };
  return (
    <Page title="Release Order">
      <Container maxWidth="xl">
        <Box component="form" pb="3" pr="3" noValidate autoComplete="off">
          <Stack spacing={5}>
            <Typography sx={{ paddingTop: 5, paddingLeft: 3 }} variant="h4">
              Release Order Entry form
            </Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="ro_number"
                  label="Ro_Number"
                  type="number"
                  variant="outlined"
                />
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} md={6} xl={6}>
                  <DatePicker
                    label="Ro_Date"
                    value={ro_value}
                    onChange={(newValue) => {
                      setRovalue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={12} md={6} xl={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Published Date"
                    value={pub_value}
                    onChange={(newValue) => {
                      setPubvalue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="add_type"
                  label="Add Type"
                  type=""
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="size"
                  label="Size"
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="edition"
                  label="Edition"
                  select
                  onChange={handleChange}
                  variant="outlined"
                >
                  {edition.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="vendor_name"
                  label="Vendor Name"
                  select
                  onChange={handleChange}
                  variant="outlined"
                >
                  {vendor_name.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="vendor_category"
                  label="Vendor_Category"
                  select
                  onChange={handleChange}
                  variant="outlined"
                >
                  {vendor_cat.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="color"
                  label="Color"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gross_amount"
                  label="Gross Amount"
                  type="number"
                  variant="outlined"
                  value={gross}
                  onChange={changeGross}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gst"
                  label="GST"
                  type="number"
                  variant="outlined"
                  onChange={changeGst}
                  value={gst}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gst_amount"
                  label="GST Amount"
                  type="number"
                  variant="outlined"
                  value={gsta}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="net_amount"
                  label="Net Amount"
                  type="number"
                  variant="outlined"
                  value={net}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="billing_address"
                  label="Billing Address"
                  select
                  onChange={handleChange}
                  variant="outlined"
                >
                  {billing_address.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" sx={{ maxWidth: 0.5 }}>
            Submit
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default ROrders;