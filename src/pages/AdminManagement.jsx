import React, {  useState } from 'react'
import Search from '../../public/svg/Search.svg?react'

const AdminManagement = () => {
  const [search, setSearch] = useState('')


  return (
    <div className="lg:h-screen overflow-x-hidden lg:overflow-y-scroll  p-4">
      <div className="mt-4 bg-white rounded-2xl px-4 py-3 ">
        <div className="flex justify-between items-center">
          <div className="relative w-70">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-orange-400" />
            <input
              type="text"
              placeholder="Search by property, name, Id or City"
              className="w-full bg-[#F9F9F9] text-gray-700  text-sm
                         rounded-lg pl-10 pr-4 py-2.5 outline-none "
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
          </div>
          <div className="ml-4 space-x-2  ">
            <button className='bg-[#00B806] text-white text-[13px] px-[10px] py-2.5 rounded-[40px] cursor-pointer'>+ Add New Admin</button>
            <button className='bg-[#FF6A00] text-white text-[13px] px-[10px] py-2.5 rounded-[40px] cursor-pointer'>Export CSV</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default AdminManagement
