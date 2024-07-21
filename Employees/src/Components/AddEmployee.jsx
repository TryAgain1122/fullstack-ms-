import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const inputStyles = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

const AddEmployee = () => {
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''
    })
    const [category, setCategory] = useState([])

    useEffect(() => {
        axios
            .get("https://employee-backend-seven.vercel.app/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('image', employee.image);
        formData.append('category_id', employee.category_id)

        axios.post('https://employee-backend-seven.vercel.app/auth/add_employee', formData)
            .then(result => {
                console.log(result.data)
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        console.log(employee)

    }
    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4">
            <div className="flex flex-col flex-grow overflow-y-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className={inputStyles}
                                id='inputName'
                                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                            />
                        </div>
                        <div className="col-span-1">
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
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className={inputStyles}
                                id='inputPassword4'
                                placeholder='Enter Password'
                                onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
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
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                id="category"
                                onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
                                className={inputStyles}
                            >
                                {category.map(c => {
                                    return <option value={c.id}>{c.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Select Image</label>
                            <input
                                type="file"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                name="image"
                                id='inputGroupFile01'
                                onChange={(e) => setEmployee({ ...employee, image: e.target.files[0]})}
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <button
                                type="submit"
                                className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Employee
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee
