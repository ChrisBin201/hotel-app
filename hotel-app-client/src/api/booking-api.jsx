import { useRecoilState } from "recoil"
import { LIST_BOOKING } from "../state/booking-state";
import fetcher from "../util/fetcher";
import { API_URL } from "../util/url";


export const fetchAllBookings = async () => {
  const [bookings,setBookings] = useRecoilState(LIST_BOOKING)

  const data = await fetcher(`${API_URL}/users/booking`)
  console.log(data)
  // setTimeout(()=>setRooms(data),2000)
  setBookings(data)
  return bookings
}

