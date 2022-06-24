import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
// import { Axios } from "axios";
import Page from "../components/Page";

const Orders = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const columns = [
    { field: "id", headerName: "#", flex: 1 },
    { field: "vendor", headerName: "Vendor", flex: 1 },
    { field: "gross_amount", headerName: "Gross Amount", flex: 1 },
    { field: "Is Paid", headerName: "Is Paid", flex: 1 },
    { field: "view", headerName: "View", flex: 1 },
  ];

  React.useEffect(() => {
    console.log("fetched");
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/po")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, [props.value]);
  // React.useEffect(()=>{
  //   Axios.get('https://poorvikadashboard.herokuapp.com/api/v1/po',{
  //   }).then((response) => {
  //         console.log("fetched",response.data);
  //         const tableData=response.data;
  //         setTableData(tableData);
  //       }, (error) => {
  //         console.log(error);
  //     });
  //   },[])

  return (
    <Page title="Invoices">
      <div className="navigation_purchase">
        <Typography variant="h4">Purchase Orders /</Typography>
        <Button variant="contained" color="primary" href="invoices/add">
          Add Purchase Order
        </Button>
      </div>
      <div className="datagrid">
        <DataGrid rows={tableData} columns={columns} pageSize={5} />
      </div>
    </Page>
  );
};

export default Orders;
