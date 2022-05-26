

import Sidebar from "../../components/admin/Sidebar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LIST_CUSTOMER } from "../../state/user-state";
import { deleteService, fetchAllServices, editService,addService } from "../../api/service-api";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import fetcher from "../../util/fetcher";
import { API_URL } from "../../util/url";
import ContentDialog, { methods } from "../../components/admin/ContenDialog";
import RoomServiceIcon from '@mui/icons-material/RoomService';

const AddService = ({ triggers }) => {
  const { setOpenDialog, setChangedData, setNotify } = triggers
  const [formData, setFormData] = useState({
    service:{
      name:"",
      price:0,
      description:""
    }
  })
  const handleChange = (e) => {
    setFormData({
      service: {
        ...formData.service,
        [e.target.name]: e.target.value,
      },
    });
    console.log(formData)
  };

  const handleClickAdd = async () =>{
    const data = await addService(formData.service)
    if(!data) {
      setNotify({open:true, text:"Incorrect format in some fields", type:"warning"})
      return
    }
    setOpenDialog(false)
    setNotify({open:true, text:"The information was updated successfully", type:"success"})
    setChangedData(true)
  }
  return (
    <div className="flex flex-col p-2 rounded-lg ">
      <div
        className="flex flex-row justify-center p-6 border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
      >
        <p className="font-semibold text-2xl text-gray-800">Edit Service</p>
      </div>
      <div className="flex flex-col px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
          <div className="w-full sm:w-1/2">
            <p className="mb-2 font-semibold text-gray-700">Service Name</p>
            <input
              type="text"
              name="name"
              className="w-full p-5 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.service.name}
              onChange={handleChange}
            >
            </input>
          </div>
          <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
            <p className="mb-2 font-semibold text-gray-700">Price</p>
            <input
              type="text"
              name="price"
              className="w-full p-5 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.service.price}
              onChange={handleChange}
            >
            </input>
          </div>
        </div>
        <p className="mb-2 font-semibold text-gray-700">Description</p>
        <textarea
          type="text"
          name="description"
          placeholder="Type message..."
          className="p-5 mb-5  border border-gray-200 rounded shadow-sm h-36"
          id=""
          value={formData.service.description}
          onChange={handleChange}
        >
        </textarea>
      </div>
      <div
        className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
      >
        <p onClick={() => setOpenDialog(false)} className="cursor-pointer font-semibold text-gray-600">Cancel</p>
        <button onClick={() => handleClickAdd()} className="px-4 py-2 text-white font-semibold bg-blue-500 rounded">
          Add
        </button>
      </div>
    </div>
  )
}

const EditService = ({ data, triggers }) => {
  const { setOpenDialog, setChangedData, setNotify } = triggers
  const [formData, setFormData] = useState({
    service:data
  })
  const handleChange = (e) => {
    setFormData({
      service: {
        ...formData.service,
        [e.target.name]: e.target.value,
      },
    });
    console.log(formData)
  };

  const handleClickEdit = async () =>{
    const data = await editService(formData.service)
    if(!data) {
      setNotify({open:true, text:"Incorrect format in some fields", type:"warning"})
      return
    }
    setOpenDialog(false)
    setNotify({open:true, text:"The information was updated successfully", type:"success"})
    setChangedData(true)
  }
  return (
    <div className="flex flex-col p-2 rounded-lg ">
      <div
        className="flex flex-row justify-center p-6 border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
      >
        <p className="font-semibold text-2xl text-gray-800">Edit Service</p>
      </div>
      <div className="flex flex-col px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
          <div className="w-full sm:w-1/2">
            <p className="mb-2 font-semibold text-gray-700">Service Name</p>
            <input
              type="text"
              name="name"
              className="w-full p-5 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.service.name}
              onChange={handleChange}
            >
            </input>
          </div>
          <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
            <p className="mb-2 font-semibold text-gray-700">Price</p>
            <input
              type="text"
              name="price"
              className="w-full p-5 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.service.price}
              onChange={handleChange}
            >
            </input>
          </div>
        </div>
        <p className="mb-2 font-semibold text-gray-700">Description</p>
        <textarea
          type="text"
          name="description"
          placeholder="Type message..."
          className="p-5 mb-5  border border-gray-200 rounded shadow-sm h-36"
          id=""
          value={formData.service.description}
          onChange={handleChange}
        >
        </textarea>
      </div>
      <div
        className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
      >
        <p onClick={() => setOpenDialog(false)} className="cursor-pointer font-semibold text-gray-600">Cancel</p>
        <button onClick={() => handleClickEdit()} className="px-4 py-2 text-white font-semibold bg-blue-500 rounded">
          Edit
        </button>
      </div>
    </div>
  )
}

const DeleteService = ({ data, triggers }) => {
  console.log(data)
  const { setOpenDialog, setChangedData } = triggers
  const handleClickYes = async () =>{
    await deleteService(data)
    setOpenDialog(false)
    setChangedData(true)
  }
  return (
    <div className="relative p-4 w-full h-full md:h-auto">
      <div className="relative bg-white rounded-lg ">
        <div className="p-6 text-center">
          <svg className="mx-auto mb-4 w-14 h-14 bg-transparent text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this service?</h3>
          <button onClick={() => handleClickYes()} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            Yes, I'm sure
          </button>
          <button onClick={() => setOpenDialog(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
        </div>
      </div>
    </div>
  )
}


export default function ServiceAdmin() {
  const [services, setServices] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [method, setMethod] = useState()
  const [service, setService] = useState()
  const [changedData, setChangedData] = useState(false)
  const [notify,setNotify] = useState({open:false, text:"", type:"success"})
  const handleDelete = async (service) => {
    setOpenDialog(true)
    setMethod(methods.delete)
    setService(service)
    // setCustomers({list: list, keyword:""})
  }

  const handleEdit = (service) => {
    setOpenDialog(true)
    setMethod(methods.edit)
    setService(service)
  }

  const handleAdd = () => {
    setOpenDialog(true)
    setMethod(methods.add)
  }

  const handleChange = (e) => {
    let keyword = e.target.value
    // let list =  customers.filter( c => (s.fullname.includes(keyword) || s.username.includes(keyword))) 
    // console.log(list)
    setServices(prev => ({ ...prev, keyword: keyword }))
  }
  useEffect(() => {
    (async function () {
      let list = await fetchAllServices()
      setServices({ list: list, keyword: "" })
    })()
  }, [])

  useEffect(() => {
    if (changedData) {
      (async function () {
        let list = await fetchAllServices()
        setServices({ list: list, keyword: "" })
      })()
      setChangedData(false)
    }
  }, [changedData])

  return (
    <div className="flex" >
      <Sidebar />
      <div className="w-full p-6" >
        <div className="sm:flex justify-between px-4 pb-6">
          <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
            <form className="lg:pr-3">
              <label htmlFor="users-search" className="sr-only">Search</label>
              <div className="mt-1 relative lg:w-64 xl:w-96">
                <input onChange={handleChange} type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for users" />
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <button onClick={() => handleAdd()} type="button" data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
              <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Add Service
            </button>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>

                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Price
                      </th>
                      <th scope="col" className="p-4 text-left w-[650px] text-xs font-medium text-gray-500 uppercase">
                        Description
                      </th>
                      <th scope="col" className="p-4">
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services && services.list.map(s =>
                      (s.name.includes(services.keyword)) &&
                      <tr key={s.id} className="hover:bg-gray-100">

                        <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                          {/* <img className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar"/> */}
                          <RoomServiceIcon fontSize="large" />
                          <div className="text-sm font-normal text-gray-500">
                            <div className="text-base font-semibold text-gray-900">{s.name}</div>
                            {/* <div className="text-sm font-normal text-gray-500">neil.sims@windster.com</div> */}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{s.price}</td>
                        <td className="p-4 text-base font-medium text-gray-900">{s.description}</td>
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <button onClick={() => handleEdit(s)} type="button" data-modal-toggle="user-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(s)} type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
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
        open={openDialog}
        // onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <ContentDialog method={method} data={service} triggers={{ setOpenDialog, setChangedData,setNotify }} views={{ AddView: AddService, EditView: EditService, DeleteView: DeleteService }} />
      </Dialog>
      <Snackbar className="" open={notify.open} autoHideDuration={3000}  onClose={()=> setNotify(prev => ({...prev,open:false, text:""}))} >
        <Alert  severity={notify.type} className="flex items-center " sx={{ width: "100%" }}>
          {notify.text}
        </Alert>
      </Snackbar>
    </div >
  )
}