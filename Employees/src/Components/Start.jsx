import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Start = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('https://employee-backend-seven.vercel.app/verify')
        .then(result => {
            if (result.data.Status) {
               if (result.data.role === "admin") {
                navigate('/dashboard')
               } else {
                navigate(`/employee_detail/${result.data.id}` )
               }
            }
        }).catch(err => console.log(err))
    },[])
    return (
        <div  className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-screen">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        
            <div className="p-4 md:p-5 text-center">
               
                <h2 className="mb-5 font-normal text-gray-500 dark:text-gray-400 text-2xl">Login as</h2>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {navigate('/employee_login')}}
                >Employee</button>

                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => {navigate('/adminlogin')}}>Admin</button>
            </div>
        </div>
    </div>
</div>
    )
}

export default Start
