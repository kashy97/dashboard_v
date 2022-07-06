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
import Page from "../../components/Page";
import Axios from "axios";
import { SnackbarProvider,useSnackbar } from 'notistack';

const IAdd = () => {

  const {enqueueSnackbar} = useSnackbar();
  const [itemList, setItemList] = useState([{
    unit_price:0,
    title:'',
    quantity:0,
    gst:0,
    net_amount:0,
  }]);
  const [senderRef, setSenderRef] = useState('');
  const [net,setNet] =useState([]);
  const [gst_amount, setGst_amount] = useState(0);
  const [gstAmount, setGstAmount] = useState([]);
  const [vendors, setVendors] =useState([]);
  const [totalGross,setTotalGross]=useState(0);
  const [totalGst,setTotalGst]=useState(0);
  const [branches, setBranches] =useState([]);
  const [idofvendor,setIdofvendor]=useState(0);
  const [idofbranch,setIdofbranch]=useState(0);
  const [noOfItems,setNoOfItems]=useState(1);
  // const [search_index, setSearch_index]= useState(0);

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
    setTotalGst(gstAmount.reduce((a,b)=>a=a+b,0))
    setTotalGross(net.reduce((p,q)=>p=p+q,0))
  },[gstAmount, noOfItems, net])
  
  useEffect(()=>{
    Axios.get('https://poorvikadashboard.herokuapp.com/api/v1/vendor',{
    }).then((response) => {
          console.log("vendor",response.data);
          const vendors=response.data;
          setVendors(vendors);
        }, (error) => {
          console.log(error);
      });
    },[])
  useEffect(()=>{
    Axios.get('https://poorvikadashboard.herokuapp.com/api/v1/branches',{
    }).then((response) => {
          console.log("branches",response.data);
          const branches=response.data;
          setBranches(branches);
        }, (error) => {
          console.log(error);
      });
    },[])
  const handleSubmit=(e)=>{
    e.preventDefault();
    Axios.post('https://poorvikadashboard.herokuapp.com/api/v1/po',{
      vendor: idofvendor,
      sender_reference: senderRef,
      gst_amount: gstAmount,
      net_amount: net,
      items: itemList,
      branches: idofbranch,
  }).then((response) => {
        console.log(response);
        enqueueSnackbar('Added Purchase Order', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        setTimeout(() => {
          window.location.reload();
        }, 2000);     
      }, (error) => {
        enqueueSnackbar('Check the data and try again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        console.log(error);
    });
  }


const handleItemRemove= (index) => {
    setNoOfItems(noOfItems-1)
    const list=[...itemList];
    // gst_amount.map((i)=>{
    //   while(i.gst_amount[index]===index){
    //     gstAmount -= i.gst_amount[index]
    //     setGstAmount(gstAmount)}
    // })
    list.splice(index,1);
    setItemList(list);
};

const handleItemAdd = () => {
    setNoOfItems(noOfItems+1);
    setItemList([...itemList, {
      unit_price:0,
      title:'',
      quantity:0,
      gst:0,
      net_amount:0,
  }]);
};

const handleItemChange=(e,index)=>{
  const list =[...itemList];
  list[index][e.target.name]=e.target.value;
  const percent = list[index].gst / 100;
  const total = list[index].quantity * list[index].unit_price;
  setGst_amount(Math.round(total * percent));
  gstAmount[index]=gst_amount;
  list[index].net_amount=gst_amount + total;
  net[index]=list[index].net_amount;
  setItemList(list);
};

  const qtClick = (e,index) => {
    const list =[...itemList];
    if(list[index][e.target.value]===0)
      list[index][e.target.value]="";
  }
  const priceClick = (e,index) => {
    const list =[...itemList];
    if(list[index][e.target.value]===0)
      list[index][e.target.value]="";
  }
  const gstClick = (e,index) => {
    const list =[...itemList];
    if(list[index][e.target.value]===0)
      list[index][e.target.value]="";
  }

  // useEffect(() => {
  //   let list = [...itemList];
  //   const percent = list[search_index].gst / 100;
  //   const total = list[search_index].quantity * list[search_index].unit_price;
  //   setGst_amount(Math.round(total * percent));
  //   list[search_index].net_amount=gst_amount + total;
  // }, [gst_amount, itemList, search_index]);

  return (
    <Page title="Invoices | Add">
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
            {itemList.map((items,index) => (
            <div key={index} className="item-list">
              <Grid container key={index} spacing={2} sx={{ pr: 5 }}>
                <Grid item xs={6} md={6} xl={4}>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    // onClick={()=>setSearch_index(index)}
                    type="text"
                    value={items.title}
                    onChange={(e)=>handleItemChange(e,index)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  fullWidth
                  id="price"
                  name="unit_price"
                  label="Price"
                  type="number"
                  variant="outlined"
                  onClick={()=>priceClick(index)}
                  value={items.unit_price}
                  onChange={(e)=>handleItemChange(e,index)}
                /></Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  fullWidth
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  onClick={()=>qtClick(index)}
                  value={items.quantity}
                  onChange={(e)=>handleItemChange(e,index)}
                /></Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  id="gst"
                  name="gst"
                  fullWidth
                  label="GST"
                  type="number"
                  variant="outlined"
                  onClick={()=>gstClick(index)}
                  value={items.gst}
                  onChange={(e)=>handleItemChange(e,index)}
                >
                </TextField></Grid>
                <Grid item xs={6} md={6} xl={4}><TextField
                  fullWidth
                  id="gross"
                  name="net_amount"
                  label="Gross Amount"
                  type="number"
                  variant="outlined"
                  // onClick={()=>setSearch_index(index)}
                  value={items.net_amount}
                  disabled
                /></Grid>
                {itemList.length!==1 && (
                <Grid item xs={6} md={6} xl={4}>
                  <Button
                  sx={{ maxWidth: 8}} 
                  size="medium" 
                  variant="outlined"
                  onClick={()=>handleItemRemove(index)}
                  >
                    -
                  </Button>
                  </Grid>
                )}
              </Grid>
              {itemList.length - 1 === index && (
                <div className="plus-btn">
                  <Button 
                  sx={{ maxWidth: 8}} 
                  size="medium" 
                  variant="outlined"
                  onClick={handleItemAdd}
                  >
                  +
                  </Button>
                </div>
              )}
            </div>
            ))}
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
              <Typography>GST Amount: {totalGst}</Typography>
              <Typography>Gross Amount: {totalGross}</Typography>
            </Stack>
          </Stack>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" size="large" onClick={handleSubmit} sx={{ maxWidth: 0.5 }}>
              SUBMIT
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
      <IAdd />
    </SnackbarProvider>
  );
}
