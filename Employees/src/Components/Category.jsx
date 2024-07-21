import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Category = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get('https://backend-api-uo05.onrender.com/auth/category')
    .then(result => {
      if (result.data.Status) {
        setCategory(result.data.Result)
        console.log(result.data)
      } else {
        alert(result.data.Result);
      }
    }).catch(err => console.log(err))
  },[])
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg pt-5 h-screen container p-8'>
      <Link to="/dashboard/add_category" className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 '>Add Category</Link>

      <table className=' mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 flex justify-between'>
          <th className='px-6 py-3'>Name</th>
          <th className='px-6 py-3'>Actions</th>
        </thead>

        <tbody>
            {
              category.map(c => (
            <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 flex flex-row justify-between'>
              <td className='px-6 py-4' key={c.id}>{c.name}</td>
              <td className="px-10 py-4"><MdDelete size={20}/></td>
            </tr>
              ))
            }
        </tbody>
      </table>
    </div>
  )
}

export default Category
