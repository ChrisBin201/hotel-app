import React, { useEffect, useState } from "react";
import { API_URL } from "../util/url";
import jsCookie from "js-cookie";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { TOKEN_STATE } from "../state/token-state";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_STATE } from "../state/auth-state";
import { USER_STATE } from "../state/user-state"
import { Alert, CircularProgress, Snackbar } from "@mui/material";

const role = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER'
}

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user: {
      username: "",
      password: ""
    },
  });
  const [warning,setWarning] = useState({open:false, text:""})
  const [token, setToken] = useRecoilState(TOKEN_STATE)
  const [auth,setAuth] = useRecoilState(AUTH_STATE)
  // const [user,setUser] = useRecoilState(USER_STATE)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var _header = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    // let formD = ne
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: _header,
      body: JSON.stringify(formData.user)
    })
    if (response.ok) {
      console.log("sign in thanh cong");
      console.log(response.headers.get("set-cookie"))
      // console.log(document.cookie)
      let data = await response.json()
      
      // console.log()
      let  {token,...newUser} = data
      // jsCookie.set("token", token, { expires: 0.5 })
      if(newUser.role===role.ADMIN)
        jsCookie.set("adminToken", token, { expires: 0.5 })
      else
        jsCookie.set("userToken", token, { expires: 0.5 })  
      setToken(data.token)
      // setUser(newUser)
      console.log(newUser)
      navigate("/");

    }
    else {
      console.log("sign in that bai")
      console.log(formData.user)
      console.log(response)
      if(response.status===400){
        let p = {open:true,text:"Please fill out all required fields"}
        setWarning(p)
      }
      else{
        let p = {open:true,text:"Wrong username or password"}
        setWarning(p)
      }
    }
  };

  useEffect(()=>{
      if(token)
        setAuth({isAuthenticated:true})
  },[token])

  const handleChange = (e) => {
    setFormData({
      user: {
        ...formData.user,
        [e.target.name]: e.target.value,
      },
    });
    // console.log(formData)
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
              Login to your account
            </h1>
          </div>
          <form method="POST" onSubmit={handleFormSubmit}  >
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
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <button className={"justify-center text-blue-500 hover:underline"}>
              <Link to="/signup">
                Need to register? Sign up for free
              </Link>
            </button>
          </div>
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