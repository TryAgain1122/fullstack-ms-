import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount()
    employeeCount()
    salaryCount()
    AdminRecords()
  },[])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result => {
      if (result.data.Status) {
        setAdmins(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee)
      }
    })
  }

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOfEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_admin/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error)
        }
      })
  }
  return ( 
    <div>
      <div className='p-3 flex justify-center md:justify-between mt-3 flex-col md:flex-row '>
        <div className='px-3 pt-2 pb-3 border shadow-lg w-52 rounded-md'>
          <div className='text-center pb-4 '>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='flex justify-evenly'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-lg w-52 rounded-md'>
          <div className='text-center pb-4 '>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='flex justify-evenly'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-lg w-52 rounded-md'>
          <div className='text-center pb-4 '>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='flex justify-evenly'>
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className=' mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 flex justify-between'>
            <th className='px-6 py-3'>Email</th>
            <th className='px-6 py-3'>Actions</th>
          </thead>
          <tbody>
          {
              admins.map(a => (
            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 flex flex-row justify-between'>
              <td className='px-6 py-4' key={a.id}>{a.email}</td>
              <td className="px-10 py-4 cursor-pointer">
                <button onClick={() => handleDelete(a.id)}>
                <MdDelete size={20}/>
                </button>
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
