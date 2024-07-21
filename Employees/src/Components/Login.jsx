import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://employee-api-gy30.onrender.com/auth/adminlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true)
                    navigate('/dashboard')
                    setValues('')
                } else {
                    setError(result.data.Error)
                    setValues('')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className='flex justify-center items-center h-[80vh] md:h-[100vh]'>
                <div className='p-3 rounded-md shadow-md w-full md:w-1/4 border'>
                    <div className='text-warning'>
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{error && error}</span> 
                        </div>
                    </div>
                    <h2 className='mb-5 text-2xl font-bold'>Login Page</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-6'>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>

                            <input
                                type="email"
                                id="email"
                                className="
                                    bg-gray-50 
                                    border 
                                    border-gray-300 
                                    text-gray-900 
                                    text-sm 
                                    rounded-lg 
                                    focus:ring-blue-500 
                                    focus:border-blue-500 
                                    block w-full 
                                    p-2.5 
                                    dark:bg-gray-700 
                                    dark:border-gray-600 
                                    dark:placeholder-gray-400 
                                    dark:text-white 
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                            />

                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="confirm_password"
                                className="
                                    block 
                                    mb-2 
                                    text-sm 
                                    font-medium 
                                    text-gray-900 
                                    dark:text-white">Password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                className="
                                bg-gray-50 border 
                                border-gray-300 
                                text-gray-900 
                                  text-sm 
                                  rounded-lg 
                                  focus:ring-blue-500 
                                  focus:border-blue-500 
                                  block w-full p-2.5 
                                  dark:bg-gray-700 
                                  dark:border-gray-600 
                                  dark:placeholder-gray-400 
                                  dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required
                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                            />
                        </div>
                        <div className="
                            flex 
                            items-start 
                            mb-6">
                            <div className="
                                flex 
                                items-center 
                                h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value=""
                                    className="
                                        w-4 
                                        h-4 
                                        border 
                                        border-gray-300 
                                        rounded 
                                        bg-gray-50 
                                        focus:ring-3 
                                        focus:ring-blue-300 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                        </div>
                        <button
                            type="submit"
                            className="
                                text-white 
                                bg-blue-700
                                hover:bg-blue-800 
                                focus:ring-4 
                                focus:outline-none 
                                focus:ring-blue-300 
                                font-medium 
                                rounded-lg 
                                text-sm w-full 
                                sm:w-auto 
                                px-5 
                                py-2.5 
                                text-center 
                                dark:bg-blue-600 
                                dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    </form>
                </div>
            </div>
        </>
    )
}
