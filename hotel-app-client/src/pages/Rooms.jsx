import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { API_URL } from "../util/url";
import jsCookie from "js-cookie";
import fetcher from "../util/fetcher";
import { Alert, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, FormControlLabel, Skeleton, Snackbar, Stack } from "@mui/material";
import { useRecoilState } from "recoil";
import { BOOKING_STATE, LIST_BOOKEDROOM } from "../state/booking-state";
import CardRoom from "../components/CardRoom";
import Booking from "./Booking";
function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return day + '/' + month + '/' + year;
}

export default function Rooms() {

  let now = new Date()
  let later = new Date()
  later.setDate(now.getDate() + 30)
  const [startDate, setStartDate] = useState(now)
  const [endDate, setEndDate] = useState(later)
  const [warning, setWarning] = useState({ open: false, text: "" })
  const [types, setTypes] = useState([]);
  const [rooms, setRooms] = useState([])
  const [openBooking,setOpenBooking] = useState(false)
  const [success,setSuccess] = useState({open:false, text:""})
  // const [booking, setBooking] = useRecoilState(BOOKING_STATE)
  const [bookedRoom, setBookedRoom] = useRecoilState(LIST_BOOKEDROOM)
  const handleSelectRoom = (newBr, isChecked) => {
    let listBr = [...bookedRoom];
    // let c = checked;
    if(isChecked)
      listBr.push(newBr)
    else{
      let index = listBr.findIndex(br =>br.roomID===newBr.roomID)
      listBr.splice(index,1)
    }
    setBookedRoom([...listBr])
    console.log(listBr)
  };

  const handleCreateBooking = () =>{
    setOpenBooking(true)
  }

  async function fetchRooms() {

    let ci = getFormattedDate(startDate)
    let co = getFormattedDate(endDate)
    if (startDate > endDate) {
      setWarning({ open: true, text: "Wrong start date or end date" })
      return
    }
    const data = await fetcher(`${API_URL}/rooms/freeRooms?ci=${ci}&co=${co}`)
    console.log(data)
    // setTimeout(()=>setRooms(data),2000)
    setRooms(data)
  } 

  useEffect(() => {
    // let ci = getFormattedDate(startDate)
    console.log(startDate)
    fetchRooms()
  }, [])

  return (
    <div>
      <div>ROOMS</div>
      <div>SEARCH AVAILABLE ROOMS </div>
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DatePicker
          label="Start date"
          value={startDate}
          onChange={(newStartDate) => {
            setStartDate(newStartDate);
            console.log(newStartDate)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End date"
          value={endDate}
          onChange={(newEndDate) => {
            setEndDate(newEndDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant="contained" endIcon={<SearchIcon />} onClick={() => fetchRooms()} >Search</Button>
      <FormControl fullWidth>
        <InputLabel id="type-room-label">Type</InputLabel>
        <Select
          labelId="type-room-label"
          id="type-room"
          // value={age}
          label="Type"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={() => handleCreateBooking()} >Create Booking</Button>
      <div className="grid grid-cols-3 gap-6" >
        {
          rooms ?
          <>
            {rooms.map(r =>
              <CardRoom room={r} handleSelectRoom ={handleSelectRoom} />
            )}
            </>
            :
          <>
            <Stack spacing={1}>
              <Skeleton animation="pulse" variant="rectangular" width={210} height={118} />
              <Skeleton animation="pulse" />
              <Skeleton animation="pulse" width="60%" />
            </Stack>
            <Stack spacing={1}>
              <Skeleton animation="pulse" variant="rectangular" width={210} height={118} />
              <Skeleton animation="pulse" />
              <Skeleton animation="pulse" width="60%" />
            </Stack>
            <Stack spacing={1}>
              <Skeleton animation="pulse" variant="rectangular" width={210} height={118} />
              <Skeleton animation="pulse" />
              <Skeleton animation="pulse" width="60%" />
            </Stack>
            </>
        }
      </div>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={openBooking}
        onClose={() => setOpenBooking(false)}
      >
        <DialogContent>
          <Booking trigger={{setOpenBooking,fetchRooms,setSuccess}} checkIn={startDate} checkOut = {endDate} />
        </DialogContent>
      </Dialog>
      <Snackbar className="" open={warning.open} autoHideDuration={4000} onClose={() => setWarning({ open: false, text: "" })} >
        <Alert severity="warning" className="flex items-center " sx={{ width: "100%" }}>
          {warning.text}
        </Alert>
      </Snackbar>
      <Snackbar className="" open={success.open} autoHideDuration={2000}  onClose={()=> setSuccess({open:false, text:""})} >
        <Alert  severity="success" className="flex items-center " sx={{ width: "100%" }}>
          {success.text}
        </Alert>
      </Snackbar>
    </div>
  )
}