import { Alert, Button, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { LIST_BOOKEDROOM } from "../state/booking-state"
import { USER_STATE } from "../state/user-state"
import { formatListUs, getFormattedDate, totalServices } from "../util/format"
import fetcher from "../util/fetcher";
import { API_URL } from "../util/url";
import { useNavigate } from "react-router-dom"


export default function Booking({ trigger, checkIn, checkOut }) {
  const { setOpenBooking, fetchRooms, setSuccess } = trigger
  const navigate = useNavigate()
  const [bookedRooms, setBookedRooms] = useRecoilState(LIST_BOOKEDROOM)
  const resetBookedRooms = useResetRecoilState(LIST_BOOKEDROOM)
  const [total, setTotal] = useState()
  const [days, setDays] = useState()
  const user = useRecoilValue(USER_STATE)
  // let t = bookedRooms.reduce((sum,br) => sum + (br.price + totalServices(br.listUsedService)))

  useEffect(() => {
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) +1; 
    let t = bookedRooms.reduce((sum, br) => sum + (br.price * diffDays + totalServices(br.listUsedService)), 0)
    setDays(diffDays)
    setTotal(t)
  }, [])

  const handleBooking = async () => {
    console.log(bookedRooms)
    let date = getFormattedDate(new Date())
    let listBookedRoom = bookedRooms.map(br => {
      let listUS = formatListUs(br.listUsedService)
      return { roomId: br.id, listUsedService: listUS }
    })
    console.log(date)
    let booking = {
      bookingDateStr: date,
      checkin: getFormattedDate(checkIn),
      checkout: getFormattedDate(checkOut),
      userId: user.id,
      listBookedRoom: listBookedRoom
    }
    const data = await fetcher(`${API_URL}/booking/addBooking`, 'POST', booking)
    fetchRooms()
    setOpenBooking(false)
    resetBookedRooms()
    setSuccess({ open: true, text: "Đặt phòng thành công" })
    setTimeout(() => {
      navigate("/history")
    }, 1500)
    // console.log(data)
    // console.log(booking)
  }

  return (
    <div>
      <div className="text-center font-bold text-3xl" >CONFIRM BOOKING</div>
      <div className="h-[490px] overflow-y-auto overflow-x-hidden" >
        {bookedRooms.map(room =>{
          

          return(
          <div class="w-full  p-3">
            <div class="flex flex-row h-[222px] rounded-lg overflow-hidden   border shadow ">
              <img class="block  w-52  flex-none bg-cover " src={room.image} />
              <div className="flex justify-between w-full gap-8" >
                <div class="bg-white w-[450px] rounded-b lg:rounded-b-none lg:rounded-r px-4 flex flex-col gap-2 justify-center ">
                  <div className="flex gap-4 items-center" >
                    <div class="font-bold text-xl mb-2">{room.name}</div>
                    <span class="inline-block px-4 py-2 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      {room.type}
                    </span>
                  </div>
                  <p class="text-grey-darker truncate text-base">{room.description}</p>
                  <div class="flex items-center">
                    <span class=" mr-2 font-semibold">Price</span>&nbsp;<span class="font-bold text-xl">{room.price}</span>&nbsp;<span class="text-sm font-semibold">$</span>
                  </div>
                  <div className="flex gap-1" >
                    <span className="capitalize" >Number of days:</span>
                    <span>{days}</span>
                  </div>
                </div>
                {!room.listUsedService.every(us => us.quantity === 0) &&
                  <div class="p-4 my-4 bg-white rounded-lg border shadow-md flex flex-col items-center ">
                    <h5 class=" text-xl text-center font-medium text-gray-500 dark:text-gray-400">Services</h5>
                    <div class="flex text-gray-900">
                      <span class="text-2xl font-semibold">$</span>
                      <span class="text-2xl font-bold tracking-tight">{totalServices(room.listUsedService)}</span>
                    </div>
                    <ul role="list" class="my-2 space-y-2 h-[76px] px-3 overflow-y-auto overflow-x-hidden">
                      {room.listUsedService.map(us =>
                        us.quantity > 0 &&
                        <li class="flex space-x-2">
                          <svg class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.name}</span>
                          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">x</span>
                          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.quantity}</span>
                        </li>
                      )}
                    </ul>
                  </div>}
                <div className="bg-[#568BD0] w-64 text-center flex flex-col items-center gap-2 justify-center py-10 text-white" >
                  <div className="text-4xl font-bold" >Total</div>
                  <div className="text-3xl" >{room.price * days + totalServices(room.listUsedService)}$</div>
                </div>
              </div>
            </div>
          </div>)}
        )}
      </div>
      <div className="flex justify-between items-center mt-5 mb-3 px-4" >
        <div className="text-center font-bold  text-3xl text-blue-600 " >Total Price:
          <span className="ml-2" >{total}$</span>
        </div>
        <div className="flex gap-6" >
          <Button variant="contained" onClick={() => handleBooking()} >Confirm</Button>
          <Button variant="outlined" onClick={() => setOpenBooking(false)}  >Cancel</Button>
        </div>
      </div>

    </div>
  )
}