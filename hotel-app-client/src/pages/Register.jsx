import React, { useState } from "react";
import { API_URL } from "../util/url";
import jsCookie from "js-cookie";
import { useRecoilState, useResetRecoilState } from "recoil";
import { TOKEN_STATE } from "../state/token-state";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
export default function Register() {
  const navigate = useNavigate()
  const [warning,setWarning] = useState({open:false, text:""})
  const [formData, setFormData] = useState({
    user: {
      fullname:"",
      address:"",
      tel:"",
      username: "",
      password: "",
      role:"CUSTOMER"
    },
  });

  const [token, setToken] = useRecoilState(TOKEN_STATE)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var _header = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    // let formD = ne
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: _header,
      body: JSON.stringify(formData.user)
    })
    if (response.ok) {
      console.log("sign in thanh cong");
      let data = await response.json()
      jsCookie.set("token", data.token, { expires: 0.5 })
      // console.log()
      setToken(data.token)
      setTimeout(() => {
        navigate(`/signin`);
      }, 2000);
    }
    else {
      console.log("sign in that bai")
      console.log(formData.user)
      console.log(response.status)
      setWarning({open:true, text:"Incomplete information or username already used"})
    }
  };

  const handleChange = (e) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
    console.log(formData)
  };

  return (
    <figure className="h-screen flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
        <blockquote className="text-2xl font-medium text-center">
          <p className="text-lg font-semibold">Welcome to Our Hotel</p>
        </blockquote>

        <div className="text-primary m-6">
          <div className="flex items-center mt-3 justify-center">
            <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
              Create your account
            </h1>
          </div>
          <form method="POST" onSubmit={handleFormSubmit}  >
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
            <label className="px-1">Username:</label>
            <input
              name="username"
              type="text"
              value={formData.user.username}
              onChange={handleChange}
              placeholder="Username"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <label className="px-1" >Password:</label>
            <input
              name="password"
              type="password"
              value={formData.user.password}
              onChange={handleChange}
              placeholder="Password"
              className={
                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              }
            />
            <div className="flex items-center mt-3 justify-center">
              <button
                className={
                  "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                }
                value="Login"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          
        </div>

      </div>
      <Snackbar className="" open={warning.open} autoHideDuration={4000}  onClose={()=> setWarning({open:false, text:""})} >
        <Alert  severity="warning" className="flex items-center " sx={{ width: "100%" }}>
          {warning.text}
        </Alert>
      </Snackbar>
    </figure>
  );
}