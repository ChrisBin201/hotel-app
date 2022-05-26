import { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { fetchAllCustomers, fetchTopCustomers } from "../../api/user-api"
import { LIST_CUSTOMER, TOP_CUSTOMERS } from "../../state/user-state";
import { useRecoilState } from "recoil";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function StatClient(){
  const [topCustomers, setTopCustomers] = useRecoilState(TOP_CUSTOMERS)
  const [customers, setCustomers] = useRecoilState(LIST_CUSTOMER)
  useEffect(()=>{
    (async function () {
      const list = await fetchAllCustomers()
      setCustomers(list)
      // console.log(list)
    })()
  },[])
  useEffect(() => {
    (async function () {
      const list = await fetchTopCustomers(customers)
      setTopCustomers(list)
      console.log(list)
    })()
  }, [customers])
  return(
    <div className="flex" >
      <Sidebar/>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 w-full">

            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Top Customer</h3>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th scope="col" className="p-4  bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 ">Customer</th>
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
                        {c.total}
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
  )
}