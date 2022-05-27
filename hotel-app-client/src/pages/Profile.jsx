import { Alert, Dialog, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { fetchUserInfo, editUser } from "../api/user-api"
import { USER_STATE } from "../state/user-state"
import fetcher from "../util/fetcher"
export default function Profile() {
  const [userInfo, setUserInfo] = useRecoilState(USER_STATE)
  const [openDialog, setOpenDialog] = useState(false)
  const [notify,setNotify] = useState({open:false, text:"", type:"success"})
  const [changedData, setChangedData] = useState(false)
  const [formData, setFormData] = useState({
    user: {
      fullname:"",
      address:"",
      tel:"",
      username: ""
    },
  });
  useEffect(() => {
      (async function () {
      let userInfo = await fetchUserInfo()
      setUserInfo(userInfo)
      setFormData({user: userInfo})
    })()
  }, [])



  const handleChange = (e) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
    console.log(formData)
  };

  const handleFormSubmit = async (e) =>{
    e.preventDefault();
    const data = await editUser(formData.user)
    if(!data) {
      setNotify({open:true, text:"Incorrect format in some fields", type:"warning"})
      return
    }
    setOpenDialog(false)
    setNotify({open:true, text:"The information was updated successfully", type:"success"})
    let userInfo = await fetchUserInfo()
    setUserInfo(userInfo)
    setFormData({user: userInfo})
  }

  return (
    <div className="flex" >
      <div className="flex w-full md:w-1/2 px-2 m-auto">
        <div className="flex w-full flex-col rounded shadow-lg p-4">
          {userInfo &&
            <div>
            <div className="flex flex-wrap">
              <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
                <label for="company">Fullname</label>
                <input className="my-1 p-2 rounded bg-gray-200" type="text" id="company" placeholder="NothingWorks Inc" 
                value={userInfo.fullname}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
                <label for="username">Address</label>
                <input className="my-1 p-2 rounded bg-gray-200" type="text" id="username" placeholder="@adamwathan" 
                value={userInfo.address}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col my-4 mx-2 flex-1 sm:w-full">
                <label for="firstName">Phone</label>
                <input className="my-1 p-2 rounded bg-gray-200" type="text" id="firstName" placeholder="Adam" 
                value={userInfo.tel}
                />
              </div>
            </div>

            <div className="flex justify-center" >
              <button onClick={() => setOpenDialog(true)} className="rounded-full py-2 px-4 mt-3 text-md border-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white">Update Profile</button>
              </div>
            </div>
          }
        </div>
      </div>
      <Dialog
        open={openDialog}
        // onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="py-6 px-10"  >
          <label className="px-1">Full name:</label>
            <input
              name="fullname"
              type="text"
              value={formData.user.fullname}
              onChange={handleChange}
              placeholder="Full name"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label className="px-1">Address:</label>
            <input
              name="address"
              type="text"
              value={formData.user.address}
              onChange={handleChange}
              placeholder="Address"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label className="px-1">Phone:</label>
            <input
              name="tel"
              type="text"
              value={formData.user.tel}
              onChange={handleChange}
              placeholder="Phone"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <div className="flex items-center gap-3 mt-3 justify-center">
              <button
                className={
                  "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                }
                value="Login"
                onClick={handleFormSubmit}
              >
                Update
              </button>
              <button
                className={
                  " py-2 px-4 text-md text-blue-500 rounded border border-blue-500 focus:outline-none focus:border-black"
                }
                value="Cancel"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
      </Dialog>
      <Snackbar className="" open={notify.open} autoHideDuration={3000}  onClose={()=> setNotify(prev => ({...prev,open:false, text:""}))} >
        <Alert  severity={notify.type} className="flex items-center " sx={{ width: "100%" }}>
          {notify.text}
        </Alert>
      </Snackbar>
    </div>
  )
}