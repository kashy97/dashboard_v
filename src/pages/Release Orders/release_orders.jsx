import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { SnackbarProvider,useSnackbar } from "notistack";
import React from "react";
import {createBrowserHistory} from 'history';
import axios from "axios";
import Page from "../../components/Page";

const ROrders = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  // const [vendorData, setVendorData] = React.useState([]);
  const [roData, setRoData] = React.useState([]);
  const url="https://poorvikadashboard.herokuapp.com/api/v1/ro";

  // React.useEffect((id) => {
  //   console.log("fetched");
  //   fetch("https://poorvikadashboard.herokuapp.com/api/v1/vendor")
  //     .then((data) => {
  //       data.json()
  //       console.log(data)
  //       setVendorData(data)
  //     })
  // },[poData]);


  React.useEffect(() => {
    console.log("fetched");
    axios.get(url).then((res) => {
      console.log(res.data)
      setRoData(res.data)
    });
  }, []);

  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
    axios.delete(`${url}/${id}`).then(()=>{
        enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        setTimeout(() => {
          window.location.reload();
        }, 2000); 
      }).catch (err => console.log(err))
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/dashboard/ro/update/${id}`)
    window.location.reload();
  }

  return (
    <Page title="Invoices">
      <div className="navigation_purchase">
        <Typography variant="h4">Release Orders</Typography>
        <Button variant="contained" color="primary" href="release_orders/add">
          Create Release Order
        </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {roData.map((r)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ width:1, borderRadius: 5, minHeight: '25vh', m:'2vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {r.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                {r.ro_date}
                </Typography>
                <Typography color="text.secondary">
                {r.Add_type}
                </Typography>
                <Typography color="text.secondary">
                {r.Size}
                </Typography>
                <Typography color="text.secondary">
                {r.color}
                </Typography>
                <Typography>
                Vendor
                </Typography>
                {r.vendor.name}
                <Typography>
                Gross Amount
                </Typography>
                <Typography color="text.secondary">
                {r.gross_amount}
                </Typography>
                <Typography>
                GST
                </Typography>
                <Typography color="text.secondary">
                {r.gst}
                </Typography>
                <Typography>
                Net Amount
                </Typography>
                <Typography color="text.secondary">
                {r.net_amunt}
                </Typography>
                <Typography>
                Billing Address
                </Typography>
                {r.billing_address.name}
              </CardContent>
              <CardActions sx={{ justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(r.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(r.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
      </div>

    </Page>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <ROrders />
    </SnackbarProvider>
  );
}

