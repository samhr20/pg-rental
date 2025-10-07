import React, { useState } from 'react'
import Search from '../../public/svg/Search.svg?react'
import useNewAdmin from '../context/AddNewAdminContext'

const AdminManagement = () => {
  const [search, setSearch] = useState('')
  const { adminToggle } = useNewAdmin()

  return (
    <div className="flex p-[30px] bg-white rounded-[20px] flex-col gap-[20px] ">

      <div className="flex justify-between items-center h-[40px]">
        <div className="relative min-w-[320px] rounded-[40px] py-2.5 px-5 flex flex-col gap-2.5">
          <Search className="absolute w-6 h-6 top-[29%] left-[9%] text-orange-400" />
          <input
            type="text"
            placeholder="Search by property, name, Id or City"
            className="w-full custom-poppins text-[12px] bg-[#F9F9F9] text-[#838383] 
                         rounded-lg pl-10 pr-4 py-2.5 outline-none "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </div>
        <div className="flex gap-2.5 ">
          <button className='bg-[#00B806] custombutton' onClick={(adminToggle)}>+ Add New Admin</button>
          <button className='bg-[#FF6A00] custombutton'>Export CSV</button>
        </div>

      </div>

    </div>
  )
}

export default AdminManagement
