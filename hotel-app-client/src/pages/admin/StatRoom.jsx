import { Box, Dialog, DialogContent, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { fetchAllRooms, fetchRoomStat } from "../../api/room-api"
import Sidebar from "../../components/admin/Sidebar"
import { LIST_ROOM } from "../../state/room-state"
import { LIST_CUSTOMER } from "../../state/user-state"
export default function StatRoom() {
  const [rooms, setRooms] = useRecoilState(LIST_ROOM)
  const [roomStat, setRoomStat] = useState([])
  const [openDetail,setOpenDetail] = useState(false)
  const [bookingStat,setBookingStat] = useState([])
  useEffect(() => {
    (async function () {
      const list = await fetchAllRooms()
      setRooms(list)
      // console.log(list)
    })()
  }, [])
  useEffect(() => {
    (async function () {
      const list = await fetchRoomStat(rooms)
      setRoomStat(list)
      console.log(list)
    })()
  }, [rooms])
  return (
    <div className="flex" >
      <Sidebar />
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 w-full">

        <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Room Statistic</h3>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th scope="col" className="p-4 w-80 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Room</th>
                <th scope="col" className="p-4  bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Type</th>
                <th scope="col" className="p-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Total</th>
                <th scope="col" className="p-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 "></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roomStat && 
              roomStat.map((r, i) =>
                <tr key={i} className=" ">
                  <td className=" p-4 whitespace-nowrap" >
                    <div className="flex gap-4 items-center" >
                      <div className="flex-shrink-0">
                        <img className="h-16 w-16 rounded-md" src={r.room.image} alt="Neil image" />
                        {/* <AccountCircleIcon fontSize="large" /> */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {r.room.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-4   text-base font-semibold text-gray-900">
                    {r.room.type}
                  </td>
                  <td className="whitespace-nowrap p-4  text-base font-semibold text-gray-900">
                    {r.total}
                  </td>
                  <td className="p-4 whitespace-nowrap space-x-2">
                    <button onClick={()=> {setBookingStat(r.listBooking); setOpenDetail(true)}}  type="button" data-modal-toggle="user-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                      Detail
                    </button>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openDetail}
        onClose={() => setOpenDetail(false)}
      >
        <DialogContent>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th scope="col" className="p-4 w-80 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Customer</th>
                <th scope="col" className="p-4 w-80 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Booking Date</th>
                <th scope="col" className="p-4  bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Check-in</th>
                <th scope="col" className="p-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Check-out</th>
                <th scope="col" className="p-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookingStat && 
              bookingStat.map((br, i) =>
                <tr key={i} className=" ">
                  <td className=" p-4 whitespace-nowrap" >
                    <div className="flex items-center" >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {br.bookedRoom.customerName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-4   text-base font-semibold text-gray-900">
                    {br.bookedRoom.bookingDate}
                  </td>
                  <td className="whitespace-nowrap p-4   text-base font-semibold text-gray-900">
                    {br.bookedRoom.checkin}
                  </td>
                  <td className="whitespace-nowrap p-4   text-base font-semibold text-gray-900">
                    {br.bookedRoom.checkout}
                  </td>
                  <td className="whitespace-nowrap p-4  text-base font-semibold text-gray-900">
                    {br.total}
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}