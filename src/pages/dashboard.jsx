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
import AppWidgetSummary from "../section/@dashboard/AppWidgetSummary";

const DashBoard = (props) => {
  //insert data history here
  const [tableData, setTableData] = React.useState([]);
  const [vendorData, setVendorData] = React.useState([]);
  const [releaseData, setReleaseData] = React.useState([]);
  const [branchData, setBranchData] = React.useState([]);
  // const [purchaseAmount, setPurchaseAmount] = React.useState(0);
  // const [releaseAmount, setReleaseAmount] = React.useState(0);
  // const [totalPurchase, setTotalPurchase] = React.useState(0);
  // const [totalRelease, setTotalRelease] =React.useState(0);
  const r_columns = [
    { 
      field: "id", 
      headerName: "#", 
      flex: 1,
      valueFormatter: ({value}) => 'RO'+value
    },
    { field: "ro_date", headerName: "Ro Date", flex: 1},
    { 
      field: "vendor", 
      headerName: "Vendor", 
      flex: 1,
      valueFormatter: ({value}) => value.name
    },
    { field: "net_amunt", id: "r_amount", headerName: "Amount", flex: 1 },
    // { field: "view", headerName: "View", flex: 1 },
  ];
  const columns = [
    { 
      field: "id", 
      headerName: "#", 
      flex: 1,
      valueFormatter: ({value}) => 'PO'+value
    },
    { 
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
      valueFormatter: ({value}) => value.name
     },
    { field: "net_amount", id: "p_amount", headerName: "Amount", flex: 1 },
    { field: "sender_reference", headerName: "Sender Reference", flex: 1 },
  ];

  const v_columns = [
    { field: "id", headerName: "#", flex:1 }, 
    // { field: "Supplier_code", headerName: "Supplier Code", flex: 1 },
    { field: "name", headerName: "Vendor Name", flex: 1 },
    { field: "address1", headerName: "Address", flex: 1 },
    { field: "contact_reference", headerName: "Contact Reference", flex: 1 },
  ];

  const b_columns =[
    { field: "id", headerName: "#", flex:1 }, 
    { field: "state", headerName: "State", flex: 1 },
    { field: "GST_number", headerName: "GST Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    // { field: "contact_reference", headerName: "Contact Reference", flex: 1 },
  ]

  // useEffect(() => {
  //   const rTotal = async()=> {
  //       var arr = document.getElementsByName("r_amount");
  //       setTotalRelease(arr.length)
  //       var rtotal = 0;
  //       for(var i = 0; i < arr.length; i++) {
  //           if(arr[i].value) {
  //               rtotal += +arr[i].value;
  //           }
  //           setReleaseAmount(rtotal)
  //       }
  //   }
  //   rTotal()
  // }, [releaseData])
  
  // useEffect(() => {
  //   const pTotal = async()=> {
  //       var arr = document.getElementsById("p_amount");
  //       setTotalPurchase(arr.length)
  //       var ptotal = 0;
  //       for(var i = 0; i < arr.length; i++) {
  //           if(arr[i].value) {
  //               ptotal += +arr[i].value;
  //           }
  //           setPurchaseAmount(ptotal)
  //       }
  //   }
  //   pTotal()
  // }, [tableData])
  
  useEffect(() => {
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/po_list")
      .then((data) => data.json())
      .then((data) => setTableData(data));
      // console.log(tableData);
  }, [props.value]);

  useEffect(() => {
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/vendor")
      .then((data) => data.json())
      .then((data) => setVendorData(data));
      console.log("v","fetched");
  }, [props.value]);

  useEffect(() => {
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/ro_list")
      .then((data) => data.json())
      .then((data) => setReleaseData(data));
      console.log("fetched");
  }, [props.value]);

  useEffect(()=>{
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/branches")
      .then((data) => data.json())
      .then((data) => setBranchData(data));
      console.log("fetched");
  }, [props.value]);

  return (
    <Page title="Poorvika | Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography sx={{ padding: 5 }} variant="h4">
            Dashboard
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="PO Gross" total={752752} icon={'ant-design:dollar-circle-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total PO" total={7272782} color="info" icon={'ant-design:file-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="RO Gross" total={7527237} color="warning" icon={'ant-design:dollar-circle-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total RO" total={577878788} color="error" icon={'ant-design:file-filled'} />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={6}>
            <Card
              elevation={3}
              sx={{ width: 1, borderRadius: 5, minHeight: "50vh" }}
            >
              <CardContent>
                <Typography variant="h6" style={{ paddingLeft: 5 }}>
                  {" "}
                  Purchase Order
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
          <Grid item xs={12} md={6} xl={6}>
            <Card
              elevation={3}
              sx={{ width: 1, borderRadius: 5, minHeight: "50vh" }}
            >
              <CardContent>
                <Typography variant="h6" style={{ paddingLeft: 5 }}>
                  {" "}
                  Newest Branches
                </Typography>
              </CardContent>
              <CardActions sx={{ pl: 2, pr: 2, pb: 2 }}>
                <div style={{ height: 300, flexGrow: 1 }}>
                  <DataGrid
                    rows={branchData}
                    columns={b_columns}
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
