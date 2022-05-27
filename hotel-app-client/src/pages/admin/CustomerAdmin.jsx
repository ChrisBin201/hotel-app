import Sidebar from "../../components/admin/Sidebar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LIST_CUSTOMER } from "../../state/user-state";
import { fetchAllCustomers } from "../../api/user-api";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import fetcher from "../../util/fetcher";
import { API_URL } from "../../util/url";


export default function CustomerAdmin() {
  const [customers, setCustomers] = useState()
  const [openDelete, setOpenDelete] = useState(false)
  const [client, setClient] = useState()

  const handleDelete = async(client) =>{
    let data = await fetcher(`${API_URL}/users/deleteUser/${client.id}`,'DELETE')
    console.log(data)
    setOpenDelete(false)
    let list = await fetchAllCustomers()
    setCustomers({list: list, keyword:""})
  }

  const handleChange = (e) =>{
    let keyword = e.target.value
    // let list =  customers.filter( c => (c.fullname.includes(keyword) || c.username.includes(keyword))) 
    // console.log(list)
    setCustomers(prev => ({...prev,keyword: keyword}))
  }
  useEffect(() => {
    (async function () {
      let list = await fetchAllCustomers()
      setCustomers({list: list, keyword:""})
    })()
  }, [])
  return (
    <div className="flex" >
      <Sidebar />
      <div className="p-6 w-full" >
        <div className="sm:flex justify-between px-4 pb-6 ">
          <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
            <form className="lg:pr-3">
              <label htmlFor="users-search" className="sr-only">Search</label>
              <div className="mt-1 relative lg:w-64 xl:w-96">
                <input onChange={handleChange} type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for users" />
              </div>
            </form>
          </div>
          {/* <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <button onClick={() => setOpenAdd(true)} type="button" data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
              <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Add Customer
            </button>
          </div> */}
        </div>
        <div className="flex flex-col px-4">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>

                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Full Name
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Username
                      </th>
                      <th scope="col" className="p-4 text-left w-64 text-xs font-medium text-gray-500 uppercase">
                        Address
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Phone
                      </th>
                      <th scope="col" className="p-4">
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers && customers.list.map(c =>
                      (c.fullname.includes(customers.keyword) || c.username.includes(customers.keyword)) && 
                      <tr key={c.id} className="hover:bg-gray-100">

                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                          {/* <img className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar"/> */}
                          <AccountCircleIcon fontSize="large" />
                          <div className="text-sm font-normal text-gray-500">
                            <div className="text-base font-semibold text-gray-900">{c.fullname}</div>
                            {/* <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div> */}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{c.username}</td>
                        <td className="p-4 text-base font-medium text-gray-900">{c.address}</td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{c.tel}</td>
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <button onClick={() =>{setClient(c) ;setOpenDelete(true)}} type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openDelete}
        // onClose={() => setOpenDelete(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {client && `Are you sure you want to delete account ${client.username}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleDelete(client)}  >Yes</Button>
          <Button variant="contained"  onClick={() => setOpenDelete(false)}>No</Button>
        </DialogActions>   
    </Dialog>
    </div >
  )
}