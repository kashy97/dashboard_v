import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Page from "../components/Page";

const Orders = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const columns = [
    { field: "id", headerName: "#", flex: 1 },
    { field: "vendor", headerName: "Vendor", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "Is Paid", headerName: "Is Paid", flex: 1 },
    { field: "view", headerName: "View", flex: 1 },
  ];

  React.useEffect(() => {
    console.log("fetched");
    fetch("")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, [props.value]);

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
