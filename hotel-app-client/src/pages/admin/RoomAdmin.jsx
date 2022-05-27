import { Alert, Dialog, FormControl, Skeleton, Snackbar, Stack, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRoom, deleteRoom, editRoom, fetchAllRooms, fetchTypeRooms } from "../../api/room-api";
import Sidebar from "../../components/admin/Sidebar";
import ContentDialog, { methods } from "../../components/admin/ContenDialog";


const AddRoom = ({ data, triggers }) => {
  const { setOpenDialog, setChangedData, setNotify } = triggers
  const [types, setTypes] = useState()
  const [imgData, setImgData] = useState(null);
  const [formData, setFormData] = useState({
    room: {
      name:"",
      price:0,
      type:"SINGLE",
      description:"",
      image:""
    },
  })

  const onChangePicture = e => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      // console.log(typeof(e.target.files[0]));
      setFormData({
        room: {
          ...formData.room,
          image: e.target.files[0]
        },
      });
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      console.log(formData.room.image);
    }
  };

  const handleChange = (e) => {
    setFormData({
      room: {
        ...formData.room,
        [e.target.name]: e.target.value,
      },
    });
    console.log(formData)
  };

  const handleClickAdd = async () => {
    const data = await addRoom(formData.room)
    if(!data) {
      setNotify({open:true, text:"Incorrect format in some fields", type:"warning"})
      return
    }
    // setTimeout(() =>{
    setOpenDialog(false)
    setNotify({ open: true, text: "The information was updated successfully", type: "success" })
    setChangedData(true)
    // }
    // ,5000) 
  }

  useEffect(() => {
    (async function () {
      let list = await fetchTypeRooms()
      setTypes(list)
    })()
  }, [])
  return (
    <div className="flex flex-col p-2 rounded-lg ">
      <div
        className="flex flex-row justify-center p-3 border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
      >
        <p className="font-semibold text-2xl text-gray-800">Add Room</p>
      </div>
      <div className="flex flex-col px-6 py-5">
        <div className="flex flex-col items-center gap-3 mb-3" >
          <div className="relative w-full" >
            {!imgData &&<img className="w-full h-[300px]" src="/defaultRoom.jpg" alt="Mountain" />}
            {imgData && <img className="w-full h-[300px] " src={imgData} /> }
          </div>
          <label className=" max-w-fit flex gap-2 items-center px-4 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide capitalize border border-blue cursor-pointer hover:bg-blue-600 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="text-sm font-semibold">Upload image</span>
            <input onChange={onChangePicture} type='file' className="hidden" />
          </label>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
          <div className="w-full sm:w-1/2">
            <p className="mb-2 font-semibold text-gray-700">Room Name</p>
            <input
              type="text"
              name="name"
              className="w-full px-5 py-3 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.room.name}
              onChange={handleChange}
            >
            </input>
          </div>
          <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
            <p className="mb-2 font-semibold text-gray-700">Price</p>
            <input
              type="text"
              name="price"
              className="w-full px-5 py-3 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.room.price}
              onChange={handleChange}
            >
            </input>
          </div>
        </div>
        <div>
          <FormControl fullWidth >
            <InputLabel color="primary" id="demo-simple-select-label">Type</InputLabel>
            <Select
              // id="demo-simple-select"
              value={formData.room.type}
              name="type"
              label="Type"
              onChange={handleChange}
            >
              {types && types.map((t, i) =>
                <MenuItem key={i} value={t}>{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <p className="mb-2 font-semibold text-gray-700">Description</p>
        <textarea
          type="text"
          name="description"
          placeholder="Type message..."
          className="p-5 mb-5  border border-gray-200 rounded shadow-sm h-36"
          id=""
          value={formData.room.description}
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

const EditRoom = ({ data, triggers }) => {
  const { setOpenDialog, setChangedData, setNotify } = triggers
  const [types, setTypes] = useState()
  const [imgData, setImgData] = useState(null);
  const [formData, setFormData] = useState({
    room: data,
  })

  const onChangePicture = e => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      // console.log(typeof(e.target.files[0]));
      setFormData({
        room: {
          ...formData.room,
        },
        img: e.target.files[0]
      });
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      console.log(formData.img);
    }
  };

  const handleChange = (e) => {
    setFormData({
      room: {
        ...formData.room,
        [e.target.name]: e.target.value,
      },
    });
    console.log(formData)
  };

  const handleClickEdit = async () => {
    const data = await editRoom(formData.room, formData.img)
    if(!data) {
      setNotify({open:true, text:"Incorrect format in some fields", type:"warning"})
      return
    }
    // setTimeout(() =>{
      setOpenDialog(false)
      setNotify({ open: true, text: "The information was updated successfully", type: "success" })
      setChangedData(true)
    // }
    // ,5000) 
    
  }

  useEffect(() => {
    (async function () {
      let list = await fetchTypeRooms()
      setTypes(list)
    })()
  }, [])
  return (
    <div className="flex flex-col p-2 rounded-lg ">
      <div
        className="flex flex-row justify-center p-3 border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
      >
        <p className="font-semibold text-2xl text-gray-800">Edit Room</p>
      </div>
      <div className="flex flex-col px-6 py-5">
        <div className="flex flex-col items-center gap-3 mb-3" >
          <div className="relative w-full" >
            {!imgData &&<img className="w-full h-[300px]" src={formData.room.image} alt="Mountain" />}
            {imgData && <img className="w-full h-[300px] " src={imgData} /> }
          </div>
          <label className=" max-w-fit flex gap-2 items-center px-4 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide capitalize border border-blue cursor-pointer hover:bg-blue-600 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="text-sm font-semibold">Upload image</span>
            <input onChange={onChangePicture} type='file' className="hidden" />
          </label>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
          <div className="w-full sm:w-1/2">
            <p className="mb-2 font-semibold text-gray-700">Room Name</p>
            <input
              type="text"
              name="name"
              className="w-full px-5 py-3 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.room.name}
              onChange={handleChange}
            >
            </input>
          </div>
          <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
            <p className="mb-2 font-semibold text-gray-700">Price</p>
            <input
              type="text"
              name="price"
              className="w-full px-5 py-3 border border-gray-200 rounded shadow-sm appearance-none"
              id=""
              value={formData.room.price}
              onChange={handleChange}
            >
            </input>
          </div>
        </div>
        <div>
          <FormControl fullWidth >
            <InputLabel color="primary" id="demo-simple-select-label">Type</InputLabel>
            <Select
              // id="demo-simple-select"
              value={formData.room.type}
              name="type"
              label="Type"
              onChange={handleChange}
            >
              {types && types.map((t, i) =>
                <MenuItem key={i} value={t}>{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <p className="mb-2 font-semibold text-gray-700">Description</p>
        <textarea
          type="text"
          name="description"
          placeholder="Type message..."
          className="p-5 mb-5  border border-gray-200 rounded shadow-sm h-36"
          id=""
          value={formData.room.description}
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

const DeleteRoom = ({ data, triggers }) => {
  console.log(data)
  const { setOpenDialog, setChangedData } = triggers
  const handleClickYes = async () => {
    await deleteRoom(data)
    setOpenDialog(false)
    setChangedData(true)
  }
  return (
    <div className="relative p-4 w-full h-full md:h-auto">
      <div className="relative bg-white rounded-lg ">
        <div className="p-6 text-center">
          <svg className="mx-auto mb-4 w-14 h-14 bg-transparent text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this room?</h3>
          <button onClick={() => handleClickYes()} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            Yes, I'm sure
          </button>
          <button onClick={() => setOpenDialog(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
        </div>
      </div>
    </div>
  )
}


export default function RoomAdmin() {
  const [rooms, setRooms] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [method, setMethod] = useState()
  const [room, setRoom] = useState()
  const [changedData, setChangedData] = useState(false)
  const [notify, setNotify] = useState({ open: false, text: "", type: "success" })
  const handleDelete = async (room) => {
    setOpenDialog(true)
    setMethod(methods.delete)
    setRoom(room)
    // setCustomers({list: list, keyword:""})
  }

  const handleEdit = (room) => {
    setOpenDialog(true)
    setMethod(methods.edit)
    setRoom(room)
  }

  const handleAdd = () => {
    setOpenDialog(true)
    setMethod(methods.add)
  }

  const handleChange = (e) => {
    let keyword = e.target.value
    // let list =  customers.filter( c => (s.fullname.includes(keyword) || s.username.includes(keyword))) 
    // console.log(list)
    setRooms(prev => ({ ...prev, keyword: keyword }))
  }
  useEffect(() => {
    (async function () {
      let list = await fetchAllRooms()
      setRooms({ list: list, keyword: "" })
    })()
  }, [])

  useEffect(() => {
    if (changedData) {
      (async function () {
        let list = await fetchAllRooms()
        setRooms({ list: list, keyword: "" })
        console.log("run")
      })()
      setChangedData(false)
    }
  }, [changedData])
  return (
    <div className="flex gap-10 " >
      <Sidebar />
      <div className="w-full p-6" >
        <div className="sm:flex justify-between px-4 pb-8">
          <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
            <div className="lg:pr-3">
              <label htmlFor="users-search" className="sr-only">Search</label>
              <div className="mt-1 relative lg:w-64 xl:w-96">
                <input onChange={handleChange} type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for users" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <button onClick={() => handleAdd()} type="button" data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
              <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Add Room
            </button>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <div className="grid grid-cols-3 gap-6" >
                  {
                    rooms ? 
                      <>
                        {rooms.list.map(room =>
                          (room.name.includes(rooms.keyword)) &&
                          <div className="max-w-[350px] rounded overflow-hidden shadow-lg flex flex-col gap-2">
                            <img className="w-full h-[250px] object-center " src={room.image} alt="Mountain" />
                            <div className="px-6 ">
                              <div className="font-bold text-xl mb-2">{room.name}</div>
                              <p className="text-gray-700 text-base truncate">{room.description}</p>
                            </div>
                            <div className="px-6">
                              <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                {room.type}
                              </span>
                            </div>
                            <div className=" px-3 pb-3 flex items-center">
                              <span className="text-sm font-semibold">Price</span>&nbsp;<span className="font-bold text-xl">{room.price}</span>&nbsp;<span className="text-sm font-semibold">$</span>
                            </div>
                            <div className=" px-6 pb-4 flex justify-end gap-6" >
                              <button onClick={() => handleEdit(room)} type="button" data-modal-toggle="user-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                Edit
                              </button>
                              <button onClick={() => handleDelete(room)} type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                      :
                      <>
                        <Stack spacing={1}>
                          <Skeleton animation="pulse" variant="rectangular" width={210} height={118} />
                          <Skeleton animation="pulse" />
                          <Skeleton animation="pulse" width="60%" />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton animation="pulse" variant="rectangular" width={210} height={118} />
                          <Skeleton animation="pulse" />
                          <Skeleton animation="pulse" width="60%" />
                        </Stack>
                        <Stack spacing={1}>
                          <Skeleton animation="pulse" variant="rectangular" width={210} height={118} />
                          <Skeleton animation="pulse" />
                          <Skeleton animation="pulse" width="60%" />
                        </Stack>
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        // onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <ContentDialog method={method} data={room}
          triggers={{ setOpenDialog, setChangedData, setNotify }}
          views={{ AddView: AddRoom, EditView: EditRoom, DeleteView: DeleteRoom }}
        />
      </Dialog>
      <Snackbar className="" open={notify.open} autoHideDuration={3000} onClose={() => setNotify(prev => ({ ...prev, open: false, text: "" }))} >
        <Alert severity={notify.type} className="flex items-center " sx={{ width: "100%" }}>
          {notify.text}
        </Alert>
      </Snackbar>
    </div >
  )
}