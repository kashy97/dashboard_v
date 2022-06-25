import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Container,
  Grid,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import PickersDay from "@mui/lab/PickersDay";
import startOfDay from "date-fns/startOfDay";
import DatePicker from "@mui/lab/DatePicker";
import Page from "../components/Page";
import Axios from "axios";
import { SnackbarProvider,useSnackbar } from 'notistack';

const edition = [
  {
    value: "poorvika",
    label: "Poorvika",
  },
];
// const vendor_cat = [
//   {
//     value: "null",
//     label: "null",
//   },
// ];

// const CustomPickersDay = styled(PickersDay, {
//   shouldForwardProp: (prop) => prop !== "selected"
// })(({ theme, selected }) => ({
//   ...(selected && {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//     "&:hover, &:focus": {
//       backgroundColor: theme.palette.primary.dark
//     },
//     borderTopLeftRadius: "50%",
//     borderBottomLeftRadius: "50%",
//     borderTopRightRadius: "50%",
//     borderBottomRightRadius: "50%"
//   })
// }));

const ROrders = () => {

  const {enqueueSnackbar} = useSnackbar();

  const [ro_value, setRovalue] = React.useState(null);
  const [pub_value, setPubvalue] = React.useState([startOfDay(new Date())]);
  const [gross, setGross] = React.useState(0);
  const [gst, setGst] = React.useState(0);
  const [gsta, setGsta] = React.useState(0);
  const [net, setNet] = React.useState(0);
  const [addtype,setAddtype] = React.useState('');
  const [size,setSize] = React.useState('');
  const [color,setColor] = React.useState('');
  const [vendors, setVendors] =React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [idofvendor,setIdofvendor] = React.useState(0);
  const [idofbranch,setIdofbranch] = React.useState(0);
  const [send_date,setSendDate] = React.useState("");
  const [send_pubdate,setSendPubDate] = React.useState("");
  // const [billing,setBilling] =React.useState(0);  

  React.useEffect(()=>{
    Axios.get('https://poorvikadashboard.herokuapp.com/api/v1/vendor',{
    }).then((response) => {
          // console.log("vendor",response.data);
          const vendors=response.data;
          // console.log("vendor",vendors[0].name);
          setVendors(vendors);
        }, (error) => {
          console.log(error);
      });
    },[])

  React.useEffect(()=>{
    Axios.get('https://poorvikadashboard.herokuapp.com/api/v1/branches',{
    }).then((response) => {
          // console.log("vendor",response.data);
          const branches=response.data;
          // console.log("vendor",vendors[0].name);
          setBranches(branches);
        }, (error) => {
          console.log(error);
      });
    },[])

    React.useEffect(()=>{
      let newDate = new Date(pub_value)
      let date = newDate.getDate();
      let month = newDate.getMonth()+1;
      let year = newDate.getFullYear();
      setSendPubDate(year+'-'+month+'-'+date)
    },[pub_value])

    React.useEffect(()=>{
      let newDate = new Date(ro_value)
      let date = newDate.getDate();
      let month = newDate.getMonth()+1;
      let year = newDate.getFullYear();
      setSendDate(year+'-'+month+'-'+date)
    },[ro_value])
  React.useEffect(()=>{
    vendors.map((v)=>(
      setIdofvendor(v.id)
    ))
  },[vendors])

  React.useEffect(()=>{
    branches.map((b)=>(
      setIdofbranch(b.id)
    ))
  },[branches])

  const handleSubmit=(e) =>{
    e.preventDefault();
    Axios.post('https://poorvikadashboard.herokuapp.com/api/v1/ro',{
        // id: id,
        ro_date: send_date,
        Add_type: addtype,
        Size: size,
        vendor: idofvendor,
        color: color,
        gross_amount: gross,
        gst: gst,
        gst_amount: gsta,
        net_amunt: net,
        billing_address: idofbranch,
        edition: [
            {
                edition: "Test Edition 1",
            }
        ],
        pub_date: [
            {
                pub_date: send_pubdate,
            },
        ],
    }).then((response) => {
      enqueueSnackbar('Data Entry Successful', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      console.log(response);
    },(error) => {
      enqueueSnackbar('Check Data and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
      console.log(error);
    });
  }

  // const findDate = (dates, date) => {
  //   const dateTime = date.getTime();
  //   return dates.find((item) => item.getTime() === dateTime);
  // };

  // const findIndexDate = (dates, date) => {
  //   const dateTime = date.getTime();
  //   return dates.findIndex((item) => item.getTime() === dateTime);
  // };

  // const renderPickerDay = (date, selectedDates, pickersDayProps) => {
  //   if (!ro_value) {
  //     return <PickersDay {...pickersDayProps} />;
  //   }

  //   const selected = findDate(ro_value, date);

  //   return (
  //     <CustomPickersDay
  //       {...pickersDayProps}
  //       disableMargin
  //       selected={selected}
  //     />
  //   );
  // };

  React.useEffect(() => {
    // code to run when state changes
    const percent = gst / 100;
    setGsta(Math.round(gross * percent));
    setNet(Number(gsta + gross));
  }, [gst,gross,gsta]);

  const gstClick = () => {
    if(gst===0)
      setGst('')
  }

  const grossClick = () => {
    if(gross===0)
      setGross('')
  }
  // console.log("Dates",ro_value)
  return (
    <Page title="Release Order">
      <Container maxWidth="xl">
        <Box component="form" pb="3" pr="3" noValidate autoComplete="off">
          <Stack spacing={5}>
            <Typography sx={{ paddingTop: 5, paddingLeft: 3 }} variant="h4">
              Release Order Entry form
            </Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              {/* <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="ro_number"
                  label="Ro_Number"
                  type="number"
                  variant="outlined"
                />
              </Grid> */}

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} md={6} xl={6}>
                  <DatePicker
                    label="Ro_Date"
                    value={ro_value}
                    inputFormat="yyyy-MM-dd"
                    onChange={(newValue) => {
                      // const array = ro_value;
                      // const date = startOfDay(newValue);
                      // const index = findIndexDate(array, date);
                      // if (index >= 0) {
                      //   array.splice(index, 1);
                      // } else {
                      //   array.push(date);
                      // }
                      setRovalue(newValue);
                    }}
                    // renderDay={renderPickerDay}
                    
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={12} md={6} xl={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Published Date"
                    value={pub_value}
                    inputFormat="yyyy-MM-dd"
                    onChange={(newValue) => {
                      setPubvalue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="add_type"
                  label="Add Type"
                  type="text"
                  value={addtype}
                  onChange={(e)=>setAddtype(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="size"
                  label="Size"
                  type="text"
                  value={size}
                  onChange={(e)=>setSize(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="edition"
                  label="Edition"
                  select
                  variant="outlined"
                >
                  {edition.map((option) => (
                    <MenuItem value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="vendor"
                  label="Vendor Name"
                  select
                  variant="outlined"
                >
                  {vendors.map((option) => (
                    <MenuItem value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="vendor_category"
                  label="Vendor_Category"
                  select
                  onChange={handleChange}
                  variant="outlined"
                >
                  {vendor_cat.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="color"
                  label="Color"
                  type="text"
                  value={color}
                  onChange={(e)=>setColor(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gross"
                  label="Gross Amount"
                  type="number"
                  variant="outlined"
                  onClick={grossClick}
                  value={gross}
                  onChange={(e)=>setGross(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gst"
                  label="GST"
                  type="number"
                  variant="outlined"
                  onClick={gstClick}
                  onChange={(e)=>setGst(Number(e.target.value))}
                  value={gst}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="gst_amount"
                  label="GST Amount"
                  type="number"
                  variant="outlined"
                  value={gsta}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="net_amount"
                  label="Net Amount"
                  type="number"
                  variant="outlined"
                  value={net}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="billing_address"
                  label="Billing Address"
                  select
                  variant="outlined"
                >
                  {branches.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" onClick={handleSubmit} sx={{ maxWidth: 0.5 }}>
            Submit
          </Button>
        </Box>
      </Container>
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

