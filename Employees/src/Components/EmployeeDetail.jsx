import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const EmployeeDetail = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get(`https://backend-k8aw.onrender.com/employee/detail/${id}`)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    },[])
    
    const handleLogout = () => {
        axios.get('https://backend-k8aw.onrender.com/employee/logout')
        .then(result => {
            if (result.data.Status) {
                localStorage.removeItem("valid", true)
                navigate('/')
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img 
            className="w-24 h-24 rounded-full shadow-lg object-cover" 
            src={`https://backend-k8aw.onrender.com/Images/${employee.image}`}
            alt="Profile" 
          />
          <p className="mt-2 text-gray-600">Work id: {employee.category_id}</p>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{employee.name}</h2>
          <p className="mt-2 text-gray-600">Email: {employee.email}</p>
          <p className="mt-2 text-gray-600">Salary: {employee.salary}</p>
        </div>
        <div className='mt-5 flex justify-around items-center'>

        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>


        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleLogout}>Logout</button>

        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
