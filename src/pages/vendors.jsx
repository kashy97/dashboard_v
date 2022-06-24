import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import Page from "../components/Page";
import {createBrowserHistory} from 'history';
import { SnackbarProvider,useSnackbar } from 'notistack';

const Vendors = (props) => {

  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  const [vendorData,setVendorData]= React.useState([]);

  React.useEffect(() => {
    fetch("https://poorvikadashboard.herokuapp.com/api/v1/vendor")
      .then((data) => data.json())
      .then((data) => setVendorData(data));
      // console.log("v","fetched");
  }, [props.value]);

  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
    fetch(`https://poorvikadashboard.herokuapp.com/api/v1/vendor/${id}`, { method: 'DELETE' })
      .then (res=> {
        // console.log("deleted",res)
        enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        window.location.reload(false)
      })
      .catch (err => console.log(err))
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/dashboard/vendors/update/${id}`)
    window.location.reload(false)
  }
  
  return (
    <div className="vendors">
      <Page title="Vendors">
        <div className="vendors_head">
          <Typography variant="h4">Vendors</Typography>
          <br />
          <Button
            href="/dashboard/vendors/add"
            variant="contained"
            color="primary"
          >
            Add Vendor
          </Button>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {vendorData.map((v)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ width:1, borderRadius: 5, minHeight: '25vh', m:'2vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {v.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h3">
                  Vendor Details
                </Typography>
                <Typography variant="h5" component="div">
                {v.name}
                </Typography>
                <Typography color="text.secondary">
                {v.phone}
                </Typography>
                <Typography sx={{ mb:1.5}} color="text.secondary">
                {v.email}
                </Typography>
                <Typography>
                  Address
                </Typography>
                <Typography sx={{ mr:1.5}} wrap variant="body2">
                {v.address1},{v.address2},{v.city},{v.state},{v.country}-{v.zipcode}
                </Typography>
                <Typography sx={{ mt:1.5 , textAlign:'center'}}>
                Contact Person
                </Typography>
                {v.contact_person}
                <Typography>
                Contact Reference
                </Typography>
                {v.contact_reference}
              </CardContent>
              <CardActions sx={{ width:'100%', maxWidth:'35%', margin:'0 auto', textAlign:'center'}}>
                <Button onClick={()=>updateVendor(v.id)} size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(v.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
      </Page>
    </div>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Vendors />
    </SnackbarProvider>
  );
}
