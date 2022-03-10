import { Button, Typography } from "@mui/material";
import React from "react";
import Page from "../components/Page";

const Vendors = () => {
  return (
    <div className="vendors">
      <Page title="Vendors">
        <Typography variant="h4">Vendors</Typography>
        <br />
        <Button
          href="/dashboard/vendors/add"
          variant="contained"
          color="primary"
        >
          Add Vendor
        </Button>
      </Page>
    </div>
  );
};

export default Vendors;
