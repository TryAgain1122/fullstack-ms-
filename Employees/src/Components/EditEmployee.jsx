import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
const inputStyles = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

const EditEmployee = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [category, setCategory] = useState([])
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''
    })

    useEffect(() => {
       axios.get("https://employee-api-dp5h.onrender.com/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));

            axios.get('https://employee-api-dp5h.onrender.com/auth/employee/'+id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                })
            }).catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('https://employee-api-gy30.onrender.com/auth/edit_employee/'+id, employee)
        .then(result => {
            if (result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
            <div className="flex flex-col flex-grow overflow-y-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className={inputStyles}
                                id='inputName'
                                placeholder="Enter Name"
                                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className={inputStyles}
                                id='inputName14'
                                placeholder='Enter Email'
                                autoComplete='off'
                                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            />
                        </div>
                       
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="text"
                                className={inputStyles}
                                id='inputSalary'
                                placeholder='Enter Salary'
                                autoComplete='off'
                                onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                className={inputStyles}
                                id='inputAddress4'
                                placeholder='Enter Address'
                                autoComplete='off'
                                onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                            />
                        </div>
                        
                        
                        <div className="col-span-1 md:col-span-2">
                            <button
                                type="submit"
                                className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Edit Employee
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div> 
  )
}

export default EditEmployee
