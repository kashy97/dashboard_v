import React from "react";
import Page from "../../components/Page";
import { Container, Box, Grid, TextField, Typography, Stack, Button, Divider } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";
import { SnackbarProvider,useSnackbar } from 'notistack';

const VUpdate=(props) =>{

    let {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const history=createBrowserHistory();
    const url="https://poorvikadashboard.herokuapp.com/api/v1/branches/"

    const [branchData,setBranchData]= useState({
      name:"",
      email:"",
      pincode:"",
      phone:"",
      address1:"",
      address2:"",
      city:"",
      state:"",
      country:"",
      GST_number:"",
    })

    useEffect(()=>{
      // const id=props.match.params.id
      Axios.get(url+id)
        .then((res) => {
          console.log(res.data)
          setBranchData(res.data)
      }).catch(err=>console.error(err))
  }, [id]);

    const handleUpdate = (e)=> {
      e.preventDefault()
      // const id= props.match.params.id
      Axios.put(url+id,branchData)
         .then((response) => {
          console.log(response);
          if(response.status === 200) {
            history.push("/dashboard/branches")
            enqueueSnackbar('Succesfully Updated', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } ); 
            setTimeout(() => {
              window.location.reload();
            }, 2000); 
          }
        }, (error) => {
          enqueueSnackbar('Check Data and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          console.log(error);
      });
  }
  const handleChange=(e)=>{
      const newdata={...branchData}
      newdata[e.target.id]=e.target.value
      setBranchData(newdata)
  }
    return(
        <Page title="Branches | Update">
            <Container maxWidth="xl">
                <Box
                    component="form"
                    sx={{ paddingRight: 3, paddingLeft: 3 }}
                    noValidate
                    autoComplete="off"
                    >
                    <Stack spacing={5}>
            <Typography sx={{ paddingTop: 3, paddingLeft:3 }} variant="h4">Update Branch {id}</Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  value={branchData.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  value={branchData.phone}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  value={branchData.email}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="GST_number"
                  label="GST Number"
                  type="text"
                  value={branchData.GST_number}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address1"
                  label="Address 1"
                  type="text"
                  value={branchData.address1}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="address2"
                  label="Address 2"
                  type="text"
                  value={branchData.address2}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  type="text"
                  value={branchData.city}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="state"
                  label="State"
                  type="text"
                  value={branchData.state}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  type="text"
                  value={branchData.country}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="pincode"
                  label="Pin Code"
                  type="text"
                  value={branchData.pincode}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2} md={6} xl={6}></Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" onClick={handleUpdate} sx={{ maxWidth: 0.5 }}>
            UPDATE
          </Button>
        </Box>
    </Container>
        </Page>
    )
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <VUpdate />
    </SnackbarProvider>
  );
}
