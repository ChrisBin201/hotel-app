import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { USER_STATE } from '../state/user-state';
import fetcher from '../util/fetcher';
import { totalServices } from '../util/format';
import { API_URL } from '../util/url';
import InfoIcon from '@mui/icons-material/Info';
import { Button, Dialog, DialogContent } from '@mui/material';
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
    // console.log(data) 
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
                let total = bk.listBookedRoom.reduce((sum, br) => sum + (br.price + totalServices(br.listUsedService)), 0)
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
                      <div className="text-center">{total}</div>
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
            {booking && booking.listBookedRoom.map(br =>
              <div class="w-full  p-3">
                <div class="flex flex-col lg:flex-row  rounded-lg overflow-hidden h-auto  border shadow ">
                  <img class="block h-auto w-full lg:w-48 flex-none bg-cover " src="https://pbs.twimg.com/media/DrM0nIdU0AEhG5b.jpg" />
                  <div className="flex justify-between gap-3" >
                    <div class="bg-white w-2/5 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col gap-4 justify-between leading-normal">
                      <div class="text-black font-bold text-xl mb-2 leading-tight">{br.room.name}</div>
                      <p class="text-grey-darker text-base">{br.room.description}</p>
                      <div class="px-6">
                        <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          {br.room.type}
                        </span>
                      </div>
                      <div class=" px-3 pb-3 flex items-center">
                        <span class="text-sm font-semibold">Price</span>&nbsp;<span class="font-bold text-xl">{br.price}</span>&nbsp;<span class="text-sm font-semibold">$</span>
                      </div>
                    </div>
                    {!br.listUsedService.every(us => us.quantity === 0) &&
                      <div class="p-4 my-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Services</h5>
                        <div class="flex items-baseline text-gray-900 dark:text-white">
                          <span class="text-3xl font-semibold">$</span>
                          <span class="text-3xl font-bold tracking-tight">{totalServices(br.listUsedService)}</span>
                        </div>
                        <ul role="list" class="my-3 space-y-2">
                          {br.listUsedService.map(us =>
                            us.quantity > 0 &&
                            <li class="flex space-x-2">
                              <svg class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.serviceName}</span>
                              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">x</span>
                              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{us.quantity}</span>
                            </li>
                          )}
                        </ul>
                      </div>}
                    <div className="bg-[#568BD0] p-10 text-white" >
                      <div className="text-5xl font-bold" >Total</div>
                      <div className="text-4xl" >{br.price + totalServices(br.listUsedService)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}