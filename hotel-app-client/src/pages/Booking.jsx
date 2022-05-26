import { Alert, Button, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { LIST_BOOKEDROOM } from "../state/booking-state"
import { USER_STATE } from "../state/user-state"
import { formatListUs, getFormattedDate, totalServices } from "../util/format"
import fetcher from "../util/fetcher";
import { API_URL } from "../util/url";
import { useNavigate } from "react-router-dom"


export default function Booking({trigger, checkIn, checkOut}) {
  const {setOpenBooking, fetchRooms, setSuccess} = trigger
  const navigate = useNavigate()
  const [bookedRooms, setBookedRooms] = useRecoilState(LIST_BOOKEDROOM)
  const resetBookedRooms = useResetRecoilState(LIST_BOOKEDROOM)
  const [total,setTotal] = useState()

  const user = useRecoilValue(USER_STATE)
  // let t = bookedRooms.reduce((sum,br) => sum + (br.price + totalServices(br.listUsedService)))

  useEffect(() =>{
    let t = bookedRooms.reduce((sum,br) => sum + (br.price + totalServices(br.listUsedService)),0)
    setTotal(t)
  },[])

  const handleBooking = async () =>{
    console.log(bookedRooms)
    let date = getFormattedDate(new Date())
    let listBookedRoom = bookedRooms.map(br =>{
      let listUS = formatListUs(br.listUsedService)
      return { roomId: br.id, listUsedService: listUS }
    })
    console.log(date)
    let booking ={
      bookingDateStr:date,
      checkin: getFormattedDate(checkIn),
      checkout:getFormattedDate(checkOut),
      userId: user.id,
      listBookedRoom: listBookedRoom
    } 
    const data = await fetcher(`${API_URL}/booking/addBooking`,'POST',booking)
    fetchRooms()
    setOpenBooking(false)
    resetBookedRooms()
    setSuccess({open:true,text:"Đặt phòng thành công"})
    setTimeout(()=>{
      navigate("/history")
    },1500)
    // console.log(data)
    // console.log(booking)
  }

  return (
    <div>
      <div>CONFIRM BOOKING</div>
      <div>
        {bookedRooms.map(room =>
          <div class="w-full  p-3">
            <div class="flex flex-col lg:flex-row  rounded-lg overflow-hidden h-auto  border shadow ">
              <img class="block h-auto w-full lg:w-48 flex-none bg-cover " src="https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg" />
              <div className="flex justify-between gap-3" >
                <div class="bg-white w-2/5 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col gap-4 justify-between leading-normal">
                  <div class="text-black font-bold text-xl mb-2 leading-tight">{room.name}</div>
                  <p class="text-grey-darker text-base">{room.description}</p>
                  <div class="px-6">
                    <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      {room.type}
                    </span>
                  </div>
                  <div class=" px-3 pb-3 flex items-center">
                    <span class="text-sm font-semibold">Price</span>&nbsp;<span class="font-bold text-xl">{room.price}</span>&nbsp;<span class="text-sm font-semibold">$</span>
                  </div>
                </div>
                {!room.listUsedService.every(us => us.quantity===0) &&
                <div class="p-4 my-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Services</h5>
                  <div class="flex items-baseline text-gray-900 dark:text-white">
                    <span class="text-3xl font-semibold">$</span>
                    <span class="text-3xl font-bold tracking-tight">{totalServices(room.listUsedService)}</span>
                  </div>
                  <ul role="list" class="my-3 space-y-2">
                    {room.listUsedService.map(us =>
                      us.quantity>0 &&
                      <li class="flex space-x-2">
                        <svg class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.name}</span>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">x</span>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.quantity}</span>
                      </li>
                    )}
                  </ul>
                </div>}
                <div className="bg-[#568BD0] p-10 text-white" >
                  <div className="text-5xl font-bold" >Total</div>
                  <div className="text-4xl" >{room.price + totalServices(room.listUsedService)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>{total}</div>
      <div>
      <Button variant="contained" onClick={() => handleBooking()} >Confirm</Button>
        <Button variant="contained"  >Cancel</Button>
      </div>
      
    </div>
  )
}