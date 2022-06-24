import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  CardActions,
  Box,
  CardContent,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Page from "../components/Page";

const DashBoard = (props) => {
  //insert data history here
  const [tableData, setTableData] = React.useState([]);
  const [vendorData, setVendorData] = React.useState([]);
  const [releaseData, setReleaseData] = React.useState([]);
  const r_columns = [
    { field: "id", headerName: "#", flex: 1 },
    { field: "vendor", headerName: "Vendor", flex: 1 },
    { field: "net_amunt", headerName: "Amount", flex: 1 },
    { field: "edition.edition", headerName: "Edition", flex: 1 },
    { field: "view", headerName: "View", flex: 1 },
  ];
  const columns = [
    { field: "id", headerName: "#", flex: 1 },
    { field: "vendor", headerName: "Vendor", flex: 1 },
    { field: "net_amount", headerName: "Amount", flex: 1 },
    { field: "view", headerName: "View", flex: 1 },
  ];

  const v_columns = [
    { field: "id", headerName: "#", flex:1 }, 
    { field: "Supplier_code", headerName: "Supplier Code", flex: 1 },
    { field: "name", headerName: "Vendor Name", flex: 1 },
    { field: "address1", headerName: "Address", flex: 1 },
    { field: "contact_reference", headerName: "Contact Reference", flex: 1 },
  ];

  useEffect(() => {
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/po")
      .then((data) => data.json())
      .then((data) => setTableData(data));
      console.log("fetched");
  }, [props.value]);

  useEffect(() => {
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/vendor")
      .then((data) => data.json())
      .then((data) => setVendorData(data));
      console.log("v","fetched");
  }, [props.value]);

  useEffect(() => {
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/ro")
      .then((data) => data.json())
      .then((data) => setReleaseData(data));
      console.log("fetched");
  }, [props.value]);

  return (
    <Page title="Dashboard | Vendor Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography sx={{ padding: 5 }} variant="h4">
            Dashboard
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={6}>
            <Card
              elevation={3}
              sx={{ width: 1, borderRadius: 5, minHeight: "50vh" }}
            >
              <CardContent>
                <Typography variant="h6" style={{ paddingLeft: 5 }}>
                  {" "}
                  Unpaid Purchase Order
                </Typography>
              </CardContent>
              <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
                <div style={{ height: 300, width: 1, flexGrow: 1 }}>
                  <DataGrid 
                    rows={tableData} 
                    columns={columns} 
                    pageSize={5} 
                  />
                </div>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <Card
              elevation={3}
              sx={{ width: 1, borderRadius: 5, minHeight: "50vh" }}
            >
              <CardContent>
                <Typography variant="h6" style={{ paddingLeft: 5 }}>
                  {" "}
                  Newest Vendors
                </Typography>
              </CardContent>
              <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
                <div style={{ height: 300, flexGrow: 1 }}>
                  <DataGrid
                    rows={vendorData}
                    columns={v_columns}
                    pageSize={5}
                  />
                </div>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <Card
              elevation={3}
              sx={{ width: 1, borderRadius: 5, minHeight: "50vh" }}
            >
              <CardContent>
                <Typography variant="h6" style={{ paddingLeft: 5 }}>
                  {" "}
                  Release Orders
                </Typography>
              </CardContent>
              <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
                <div style={{ height: 300, flexGrow: 1 }}>
                  <DataGrid
                    rows={releaseData}
                    columns={r_columns}
                    pageSize={5}
                  />
                </div>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashBoard;
