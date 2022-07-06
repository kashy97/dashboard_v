import {
    Box,
    Button,
    Divider,
    MenuItem,
    Grid,
    Stack,
    TextField,
    Container,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import Page from "../../components/Page";
  import axios from "axios";
  import { SnackbarProvider,useSnackbar } from 'notistack';
  import { createBrowserHistory } from "history";
  
  const IUpdate = (props) => {
  
    const {id}= useParams();
    const {enqueueSnackbar} = useSnackbar();
    const history= createBrowserHistory();
  
    // const [invoiceData,setInvoiceData]= useState([]);
    const [price, setPrice] = useState(0);
    const [senderRef, setSenderRef] = useState('');
    const [title,setTitle] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [gst, setGst] = useState(0);
    const [gross, setGross] = useState(0);
    const [gstamt, setGstamt] = useState(0);
    const [vendors, setVendors] =useState([]);
    const [branches, setBranches] =useState([]);
    const [idofvendor,setIdofvendor]=useState(0);
    const [idofbranch,setIdofbranch]=useState(0);
  
    useEffect(()=>{
      vendors.map((v) =>(
        setIdofvendor(v.id)
      ))
    },[vendors])
    
    useEffect(()=>{
      branches.map((b) =>(
        setIdofbranch(b.id)
      ))
    },[branches])
    
    useEffect(()=>{
      axios.get('https://poorvikadashboard.herokuapp.com/api/v1/vendor',{
      }).then((response) => {
            console.log("vendor",response.data);
            const vendors=response.data;
            // console.log("vendor",vendors[0].name);
            setVendors(vendors);
          }, (error) => {
            console.log(error);
        });
      },[])
    useEffect(()=>{
      axios.get('https://poorvikadashboard.herokuapp.com/api/v1/branches',{
      }).then((response) => {
            console.log("branches",response.data);
            const branches=response.data;
            // console.log("branches",branches[0].name);
            setBranches(branches);
          }, (error) => {
            console.log(error);
        });
      },[])
      // useEffect(()=>{
      //   axios.get(`https://poorvikadashboard.herokuapp.com/api/v1/po/${id}`,{
      //   }).then((response) => {
      //         console.log("branches",response.data);
      //         setInvoiceData(response.data);
      //       }, (error) => {
      //         console.log(error);
      //     });
      //   },[id])
    const handleUpdate=(e)=>{
      e.preventDefault();
      axios.put(`https://poorvikadashboard.herokuapp.com/api/v1/po/${id}`,{
        vendor: idofvendor,
        sender_reference: senderRef,
        gross_amount: gross,
        gst_amount: gstamt,
        net_amount: gross,
        items: [
            {
                title: title,
                quantity: quantity,
                unit_price: price,
                net_amount: gross,
                gst: gst,
            },
        ],
        branches: idofbranch,
    }).then((response) => {
          console.log(response);
          enqueueSnackbar('Updated Purchase Order', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          history.push("/dashboard/invoices")
          window.location.reload();
        }, (error) => {
          enqueueSnackbar('Check the data and try again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          console.log(error);
      });
    }
    const qtClick = () => {
      if(quantity===0)
        setQuantity('')
    }
    const priceClick = () => {
      if(price===0)
        setPrice('')
    }
    const gstClick = () => {
      if(gst===0)
        setGst('')
    }
    useEffect(() => {
      const percent = gst / 100;
      const total = quantity * price;
      setGstamt(Math.round(total * percent));
      setGross(gstamt + total);
    }, [gst, quantity, price, gstamt]);
  
    // const handleChange=(e)=>{
    //     const newdata={...invoiceData}
    //     newdata[e.target.id]=e.target.value
    //     setInvoiceData(newdata)
    // }

    return (
      <Page title="Invoices | Update">
        <Container maxWidth="xl">
          <Box
            component="form"
            sx={{ paddingRight: 5, paddingLeft: 5 }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2}>
              <Typography sx={{ paddingTop: 5, paddingBottom: 5 }} variant="h4">
                Add Purchase Order
              </Typography>
              <Typography variant="h6">Vendor</Typography>
              <TextField
                id="vendor"
                label="Vendor"
                select
                // value={vendors}
                // onChange={(e)=>setVendors(e.target.value)}
                helperText="Please select vendor"
                variant="outlined"
              >
                {vendors.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="h6">Items</Typography>
              <Grid container spacing={2} sx={{ pr: 5 }}>
                <Grid item xs={6} md={6} xl={4}>
                  <TextField
                    fullWidth
                    id="title"
                    label="Title"
                    type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    variant="outlined"
                  /></Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  fullWidth
                  id="price"
                  label="Price"
                  type="number"
                  variant="outlined"
                  onClick={priceClick}
                  value={price}
                  onChange={(e)=>setPrice(Number(e.target.value))}
                /></Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  onClick={qtClick}
                  value={quantity}
                  onChange={(e)=>setQuantity(Number(e.target.value))}
                /></Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  id="gst"
                  fullWidth
                  label="GST"
                  variant="outlined"
                  onClick={gstClick}
                  value={gst}
                  onChange={(e)=>setGst(Number(e.target.value))}
                >
                </TextField></Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  fullWidth
                  id="gross"
                  label="Gross Amount"
                  type="number"
                  variant="outlined"
                  value={gross}
                  disabled
                /></Grid>
              </Grid>
              {/* <Button sx={{ maxWidth: 8 }} size="medium" variant="outlined">
              +
            </Button> */}
              <TextField
                id="sender"
                label="Sender Reference"
                type="text"
                value={senderRef}
                onChange={(e)=>setSenderRef(e.target.value)}
                variant="outlined"
              />
              <Typography variant="h6">Branches</Typography>
              <TextField
                id="branches"
                label="Branches"
                select
                // value={branches}
                // onChange={(e)=>setBranches(e.target.value)}
                helperText="Please select the branch"
                variant="outlined"
              >
                {branches.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <Divider />
              <br />
              <Typography variant="h6">Total</Typography>
              <Stack spacing={1}>
                {/* <Typography>Net Amount: {}</Typography> */}
                <Typography>GST Amount: {gstamt}</Typography>
                <Typography>Gross Amount: {gross}</Typography>
              </Stack>
            </Stack>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button variant="contained" size="large" onClick={handleUpdate} sx={{ maxWidth: 0.5 }}>
                UPDATE
              </Button>
            </Box>
          </Box>
        </Container>
      </Page>
    );
  };
  
  export default function IntegrationNotistack() {
    return (
      <SnackbarProvider maxSnack={5}>
        <IUpdate />
      </SnackbarProvider>
    );
  }
  