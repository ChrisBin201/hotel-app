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
import Dashboard from "./pages/admin/Dashboard";
import Booking from "./components/Booking";
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
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/customer"
            element={
              <PrivateRoute>
                <CustomerAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/room"
            element={
              <PrivateRoute>
                <RoomAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/service"
            element={
              <PrivateRoute>
                <ServiceAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/statClient"
            element={
              <PrivateRoute>
                <StatClient />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/statRoom"
            element={
              <PrivateRoute>
                <StatRoom />
              </PrivateRoute>
            }
          />
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
          <Route path="/history" element={<History />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
