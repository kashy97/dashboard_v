import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { SnackbarProvider,useSnackbar } from "notistack";
import React from "react";
import {createBrowserHistory} from 'history';
import axios from "axios";
import Page from "../components/Page";

const Orders = (props) => {
  const enqueueSnackbar = useSnackbar();
  const history = createBrowserHistory();
  // const [vendorData, setVendorData] = React.useState([]);
  const [poData, setPoData] = React.useState([]);
  const url="https://poorvikadashboard.herokuapp.com/api/v1/po";

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
      setPoData(res.data)
    });
  }, []);

  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
    axios.delete(`${url}/${id}`).then(()=>{
        // console.log("deleted",res)
        enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        setTimeout(() => {
          window.location.reload();
        }, 2000); 
      }).catch (err => console.log(err))
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/dashboard/invoices/update/${id}`)
    window.location.reload();
  }

  return (
    <Page title="Invoices">
      <div className="navigation_purchase">
        <Typography variant="h4">Purchase Orders</Typography>
        <Button variant="contained" color="primary" href="invoices/add">
          Add Purchase Order
        </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {poData.map((p)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ width:1, borderRadius: 5, minHeight: '25vh', m:'2vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {p.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h3">
                  Invoice Details
                </Typography>
                {/* {vendorData.map(v => {
                 return p.vendor === v.id ?  */}
                <Typography variant="h5" component="div">
                {p.name}
                </Typography>
                  {/* : <></> }
                )} */}
                <Typography variant="h4">
                  Items
                </Typography>
                <Typography color="text.secondary">
                {p.items.title}
                </Typography>
                <Typography color="text.secondary">
                {p.items.quantity}
                </Typography>
                <Typography color="text.secondary">
                {p.items.unit_price}
                </Typography>
                <Typography color="text.secondary">
                {p.items.net_amount}
                </Typography>
                <Typography sx={{ mb:1.5}} color="text.secondary">
                {p.items.gst}
                </Typography>
                <Typography sx={{ mt:1.5 , textAlign:'center'}}>
                Sender Reference
                </Typography>
                {p.sender_reference}
                <Typography>
                Gross Amount
                </Typography>
                {p.gross_amount}
                <Typography>
                Branch
                </Typography>
                {p.branches.name}
              </CardContent>
              <CardActions sx={{ justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(p.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(p.id)} size="small">Delete</Button>
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
      <Orders />
    </SnackbarProvider>
  );
}

