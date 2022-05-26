import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Rooms from './pages/Rooms';
// import SingleRoom from './pages/SingleRoom';
// import Error from './pages/Error';
import Navbar from "./components/Navbar";
// import Footer from './components/Footer';
// import Booknow from './pages/Booknow';
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import { PrivateRoute } from "./components/PrivateRoute";
import Dashboard from"./pages/admin/Dashboard"
import Booking from "./pages/Booking";
import History from "./pages/History";
import Profile from "./pages/Profile";
import RoomAdmin from "./pages/admin/RoomAdmin";
import CustomerAdmin from "./pages/admin/CustomerAdmin";
import ServiceAdmin from "./pages/admin/ServiceAdmin";
import StatClient from "./pages/admin/StatClient";
import StatRoom from "./pages/admin/StatRoom";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  path="/admin/dashboard" element={<Dashboard/>} />
          <Route  path="/admin/customer" element={<CustomerAdmin/>} />
          <Route  path="/admin/room" element={<RoomAdmin/>} />
          <Route  path="/admin/service" element={<ServiceAdmin/>} />
          <Route  path="/admin/statClient" element={<StatClient/>} />
          <Route  path="/admin/statRoom" element={<StatRoom/>} />
          <Route  path="/booking" element={<Booking/>} />
          <Route
            path="/rooms"
            element={
              <PrivateRoute>
                <Rooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          {/* <Route exact path="/rooms/:slug" component={SingleRoom} />
          <Route exact path="/booknow/:slug" component={Booknow} /> */}
          <Route path="/history" element={<History/>}/>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
