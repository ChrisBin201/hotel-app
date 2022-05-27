import SideBar from "../../components/admin/Sidebar"
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import PeopleIcon from '@mui/icons-material/People';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LIST_ROOM } from "../../state/room-state";
import { LIST_CUSTOMER, TOP_CUSTOMERS } from "../../state/user-state";
import { LIST_SERVICE } from "../../state/service-state";
import { LIST_BOOKING, REVENUE_BOOKINGS } from "../../state/booking-state";
import { API_URL } from "../../util/url";
import fetcher from "../../util/fetcher";
import { fetchAllCustomers, fetchTopCustomers } from "../../api/user-api"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const currentStat = [
  {
    icon: BedroomParentIcon,
    name: "Rooms",
    total: 0
  },
  {
    icon: PeopleIcon,
    name: "Customers",
    total: 0
  },
  {
    icon: RoomServiceIcon,
    name: "Services",
    total: 0
  },
  {
    icon: MonetizationOnIcon,
    name: "Total Revenue",
    total: 0
  }
]

export default function Dashboard() {
  const [stat, setStat] = useState(currentStat)
  const [rooms, setRooms] = useRecoilState(LIST_ROOM)
  const [customers, setCustomers] = useRecoilState(LIST_CUSTOMER)
  const [services, setServices] = useRecoilState(LIST_SERVICE)
  const [bookings, setBookings] = useRecoilState(LIST_BOOKING)
  const [loading, setLoading] = useState(true)
  const revenue = useRecoilValue(REVENUE_BOOKINGS)
  const [topCustomers, setTopCustomers] = useRecoilState(TOP_CUSTOMERS)


  const fetchAllBookings = async () => {
    const data = await fetcher(`${API_URL}/booking`)
    // console.log(data)
    // setTimeout(()=>setRooms(data),2000)
    setBookings(data)

  }
  const fetchAllRooms = async () => {
    const data = await fetcher(`${API_URL}/rooms`)
    // console.log(data)
    // setTimeout(()=>setRooms(data),2000)
    setRooms(data)
  }
  const fetchAllServices = async () => {
    const data = await fetcher(`${API_URL}/service`)
    // console.log(data)
    // setTimeout(()=>setRooms(data),2000)
    setServices(data)
  }
  const fetchAllCustomers = async () => {
    const data = await fetcher(`${API_URL}/users/customers`)
    // console.log(data)
    // setTimeout(()=>setRooms(data),2000)
    setCustomers(data)
  }


  const getStatistic = () => {
    let statistic = [...stat]
    let totals = [rooms.length, customers.length, services.length, revenue]
    for (let i = 0; i < statistic.length; i++)
      statistic[i].total = totals[i]
    setStat(statistic)
  }

  useEffect(() => {
    fetchAllRooms()
    fetchAllServices()
    fetchAllBookings()
    fetchAllCustomers()
  }, [])

  useEffect(() => {
    getStatistic()
  }, [rooms, services, customers, revenue])

  useEffect(() => {
    (async function () {
      const list = await fetchTopCustomers(customers)
      setTopCustomers(list.slice(0, 5))
      console.log(list)
    })()
  }, [customers])

  return (
    <div className="flex bg-gray-50" >
      <SideBar />
      <div className="pt-6 px-4 w-full">

        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
          {stat.map((item, index) => {
            const { icon: Icon } = item
            return (
              <div key={index} className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-2xl leading-none font-bold text-gray-900">{item.total}</span>
                    <h3 className="text-lg font-normal text-gray-600">{item.name}</h3>
                  </div>
                  <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    <Icon />
                    {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg> */}
                  </div>
                </div>
              </div>
            )
          }
          )}

        </div>
        <div className="grid  xl:gap-4 my-4">

          {/* <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900">Top Customers</h3>
              <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                        <AccountCircleIcon fontSize="large" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {c.customer.fullname}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {c.customer.username}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {c.customer.address}
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {c.customer.tel}
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {c.total}
                      </div>
                    </div>
                  </li>
              </ul>
            </div>
          </div> */}

          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">

            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Top Customer</h3>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th scope="col" className="p-4  bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Top Channels</th>
                    <th scope="col" className="p-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Address</th>
                    <th scope="col" className="p-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0  ">Phone</th>
                    <th scope="col" className="p-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topCustomers && topCustomers.map((c,i) =>
                    <tr key={i} className=" ">
                      <td className=" p-4 whitespace-nowrap" >
                        <div className="flex items-center" >
                          <div className="flex-shrink-0">
                            {/* <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" /> */}
                            <AccountCircleIcon fontSize="large" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {c.customer.fullname}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {c.customer.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap p-4   text-base font-semibold text-gray-900">
                        {c.customer.address}
                      </td>
                      <td className="whitespace-nowrap p-4  text-base font-semibold text-gray-900">
                        {c.customer.tel}
                      </td>
                      <td className="whitespace-nowrap p-4  text-base font-semibold text-gray-900">
                        {c.total}$
                      </td>
                    </tr>
                  )}
                  {/* <tr className="text-gray-500">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Organic Search</th>
                    <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">5,649</td>
                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">30%</span>
                        <div className="relative w-full">
                          <div className="w-full bg-gray-200 rounded-sm h-2">
                            <div className="bg-cyan-600 h-2 rounded-sm" ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}