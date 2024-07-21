import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { GrUserManager } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import axios from 'axios';

const listStyle = "block px-4 py-2 mt-2 text-sm text-gray-600 rounded-md hover:bg-gray-200 flex flex-row items-center focus:outline-none focus:ring focus:ring-bg-blue-600"

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get('https://employee-api-gy30.onrender.com/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        navigate('/')
      }
    })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <button className="lg:hidden focus:outline-none" onClick={toggleSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <Link
            to="/dashboard"
            className="block px-4 py-2 mt-2 text-sm text-gray-700 bg-gray-200 rounded-md">
            Home
          </Link>

          <Link
            to="/dashboard/employee"
            className={listStyle}>
            <GrUserManager size={20} /> <p className='pl-2'>Manage Employee</p>
          </Link>

          <Link
            to="/dashboard/category" className={listStyle}>
            <BiCategory size={20} /> <p className='pl-2'>Category</p>
          </Link>

          <Link
            to="/dashboard/profile"
            className={listStyle}>
            <CgProfile size={20} /> <p className='pl-2'>Profile</p>
          </Link>
          <button className={listStyle}><MdLogout size={20} /> <p className='pl-2' onClick={handleLogout}>Logout</p></button>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <button className="p-2 text-white bg-blue-600 rounded-md lg:hidden" onClick={toggleSidebar}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
        {/* Add your main content here */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard
