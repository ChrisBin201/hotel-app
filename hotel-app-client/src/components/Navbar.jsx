import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { FaAlignRight } from 'react-icons/fa';
import jsCookie from 'js-cookie';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { TOKEN_STATE } from '../state/token-state';
import { USER_STATE } from '../state/user-state';
import fetcher from '../util/fetcher';
import { API_URL } from '../util/url';
import { LIST_BOOKEDROOM } from '../state/booking-state';

// for changing navbar  color


const Navbar = () => {
    const [token, setToken] = useRecoilState(TOKEN_STATE)
    const [user, setUser] = useRecoilState(USER_STATE)
    const resetBookedRooms = useResetRecoilState(LIST_BOOKEDROOM)
    useEffect(() => {
        (
            async function () {
                // const token = await jsCookie.get("token")
                // setToken(token)
                const userInfo = await fetcher(`${API_URL}/users/user`)
                setUser(userInfo)
                console.log(user ? true : false)
                console.log(userInfo)
                console.log(token)
            }
        )()
    }, [token])
    const handleSignOut = () => {
        jsCookie.remove("token")
        jsCookie.remove("userToken")
        jsCookie.remove("adminToken")
        setToken("")
        resetBookedRooms()
    }


    return (
        <>
            <nav className="bg-black py-6 ">
                <div className="flex justify-between items-center">
                    <span className="text-white text-2xl font-bold px-4">Life Luxury</span>
                    <div className="text-white px-5" id="navbarSupportedContent">
                        <ul className="flex gap-4">
                            <li className="nav-item">
                                <NavLink className="" activeclassname="active_class" to="/">Home</NavLink>
                            </li>
                            {
                                user
                                    // token
                                    ?
                                    <>
                                        {user.role === 'CUSTOMER' &&
                                            <>
                                                <li className="nav-item">
                                                    <NavLink className="" activeclassname="active_class" to="/rooms">Rooms</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="" activeclassname="active_class" to="/history">History</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="" activeclassname="active_class" to="/profile">Profile</NavLink>
                                                </li>
                                                <li className='' onClick={handleSignOut} >
                                                    <NavLink className="border rounded-md border-green-500 p-3" activeclassname="active_class" to="/signin">Sign out</NavLink>
                                                </li>
                                            </>}
                                        {user.role === 'ADMIN' &&
                                            <>
                                                <li className="nav-item">
                                                    <NavLink className="" activeclassname="active_class" to="/admin/dashboard">Admin</NavLink>
                                                </li>
                                                <li className='' onClick={handleSignOut} >
                                                    <NavLink className="border rounded-md border-green-500 p-3" activeclassname="active_class" to="/signin">Sign out</NavLink>
                                                </li>
                                            </>}
                                    </>
                                    :
                                    <>
                                        <li className='' >
                                            <NavLink className="border rounded-md border-green-500 p-3" activeclassname="active_class" to="/signin">Sign in</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="border rounded-md border-red-500 p-3" activeclassname="active_class" to="/signup">Sign up</NavLink>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Navbar;