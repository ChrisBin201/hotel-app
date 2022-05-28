import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { USER_STATE } from '../state/user-state';
import fetcher from '../util/fetcher';
import { totalServices } from '../util/format';
import { API_URL } from '../util/url';
import InfoIcon from '@mui/icons-material/Info';
import { Button, Dialog, DialogContent } from '@mui/material';
import moment from "moment"
export default function History() {
  const [history, setHistory] = useState()
  const [user, setUser] = useRecoilState(USER_STATE)
  const [openBooking, setOpenBooking] = useState(false)
  const [booking, setBooking] = useState()
  const handleClick = (index) => {
    let bk = history[index]
    setBooking(bk)
    setOpenBooking(true)
    console.log(bk)
  }

  async function fetchBookingHistory() {

    const userInfo = await fetcher(`${API_URL}/users/user/`)
    setUser(userInfo)
    console.log(userInfo)
    const data = await fetcher(`${API_URL}/booking/${userInfo.id}`)
    console.log(data) 
    // setTimeout(()=>setRooms(data),2000)
    setHistory(data)
  }

  useEffect(() => {
    fetchBookingHistory()
    console.log(history)
    // console.log(user)
  }, [])

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Booking History</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Client</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Booking Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Number Of Rooms</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Revenues</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {history && history.map((bk, i) => {
                let numRooms = bk.listBookedRoom.length

                let total = bk.listBookedRoom.reduce((sum, br) => {
                  let ci = moment(br.checkin, "DD/MM/YYYY").toDate()
                  let co = moment(br.checkout, "DD/MM/YYYY").toDate()
                  const diffTime = Math.abs(co - ci);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                  return (
                    sum + (br.price * diffDays + totalServices(br.listUsedService)))
                }, 0)
                return (
                  <tr>
                    <td className="p-2">
                      <div className="flex gap-3 items-center">
                        <AccountCircleIcon fontSize='large' />
                        <div className="text-slate-800">{bk.fullName}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{bk.bookingDate}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{numRooms}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{total}$</div>
                    </td>
                    <td>
                      <Button variant='contained' onClick={() => handleClick(i)} endIcon={<InfoIcon fontSize='large' />}>Info</Button>
                    </td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>

        </div>
      </div>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={openBooking}
        onClose={() => setOpenBooking(false)}
      >
        <DialogContent>
          <div>
            {booking && booking.listBookedRoom.map(br => {
              let ci = moment(br.checkin, "DD/MM/YYYY").toDate()
              let co = moment(br.checkout, "DD/MM/YYYY").toDate()
              const diffTime = Math.abs(co - ci);
              const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
              return (
                <div className="w-full  p-3">
            <div className="flex flex-row h-[222px] rounded-lg overflow-y-auto   border shadow ">
              <img className="block  w-52  flex-none bg-cover " src={br.room.image} />
              <div className="flex justify-between w-full gap-8" >
                <div className="bg-white w-[450px] rounded-b lg:rounded-b-none lg:rounded-r px-4 flex flex-col gap-2 justify-center ">
                  <div className="flex gap-4 items-center" >
                    <div className="font-bold text-xl mb-2">{br.room.name}</div>
                    <span className="inline-block px-4 py-2 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      {br.room.type}
                    </span>
                  </div>
                  <p className="text-grey-darker truncate text-base">{br.room.description}</p>
                  <div className="flex items-center">
                    <span className=" mr-2 font-semibold">Price</span>&nbsp;<span className="font-bold text-xl">{br.price}</span>&nbsp;<span className="text-sm font-semibold">$</span>
                  </div>
                  <div className="flex gap-1" >
                    <span className="capitalize" >Number of days:</span>
                    <span>{days}</span>
                  </div>
                </div>
                {!br.listUsedService.every(us => us.quantity === 0) &&
                  <div className="p-4 my-4 w-[280px] bg-white rounded-lg border shadow-md flex flex-col items-center ">
                    <h5 className=" text-xl text-center font-medium text-gray-500 dark:text-gray-400">Services</h5>
                    <div className="flex text-gray-900">
                      <span className="text-2xl font-semibold">$</span>
                      <span className="text-2xl font-bold tracking-tight">{totalServices(br.listUsedService)}</span>
                    </div>
                    <ul role="list" className="my-2 space-y-2 h-[76px] px-3 overflow-y-auto overflow-x-hidden">
                      {br.listUsedService.map(us =>
                        us.quantity > 0 &&
                        <li className="flex space-x-2">
                          <svg className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.serviceName}</span>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">x</span>
                          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.quantity}</span>
                        </li>
                      )}
                    </ul>
                  </div>}
                <div className="bg-[#568BD0] w-64 text-center flex flex-col items-center gap-2 justify-center py-10 text-white" >
                  <div className="text-4xl font-bold" >Total</div>
                  <div className="text-3xl" >{br.price * days + totalServices(br.listUsedService)}$</div>
                </div>
              </div>
            </div>
          </div>)
            }
            )
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}