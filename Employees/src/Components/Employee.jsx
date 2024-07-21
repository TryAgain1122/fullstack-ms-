import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './style.css'
const tableStyles = 'px-6 py-3'

const Employee = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }, []);

  //Delete actions
  const handleDelete = (id) => {
    axios.delete('http:/localhost:3000/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error)
        }
      })
  }
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg pt-5 h-screen container p-8 w-full'>
      <Link to="/dashboard/add_employee" className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 '>Add Employee</Link>



      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              <th scope="col" className=" px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <>
                <tr>
                  <td className={tableStyles} key={e.id}>{e.name}</td>
                  <td className={tableStyles}>
                    <img
                      key={e.id}
                      src={`http://localhost:3000/Images/` + e.image}
                      className="employee_image"
                      alt='no-image'
                    />
                  </td>
                  <td className={tableStyles} key={e.id}>{e.email}</td>
                  <td className={tableStyles} key={e.id}>{e.address}</td>
                  <td className={tableStyles} key={e.id}>{e.salary}</td>
                  <td className="flex flex-row items-center justify-between px-6 py-3">
                    <button onClick={() => handleDelete(e.id)}>
                      <MdDelete size={20} />
                    </button>
                    <Link
                      to={`/dashboard/edit_employee/`+ e.id}
                    >
                      <FaEdit size={20} className='cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default Employee
