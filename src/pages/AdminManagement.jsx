import React, { useState } from 'react'
import Search from '../../public/svg/Search.svg?react'
import Navigate from '../../public/svg/Navigate.svg?react'
import Filter from '../../public/svg/Filter.svg?react'
import Refresh from '../../public/svg/Refresh.svg?react'
import Eye from '../../public/svg/Eye.svg?react'
import UserX from '../../public/svg/UserX.svg?react'
import LeftArrow from '../../public/svg/LeftArrow.svg?react'
import RightArrow from '../../public/svg/RightArrow.svg?react'
import { newAdminSchema } from '../helpers/user_enum'
import useAdminManagement from '../context/AdminManagementContext'
// import { handleExportCsv } from '../functions/ExportCsvHandler'

const AdminManagement = () => {
  const [search, setSearch] = useState('')
  const { adminData, adminToggle } = useAdminManagement()
  const [postPerPage, setPostPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const lastPostIndex = postPerPage * currentPage;
  const firstPostIndex = lastPostIndex - postPerPage

  const unparse = adminData.map((admin) => ({
    AdminID: admin[newAdminSchema.AdminId],
    FullName: admin[newAdminSchema.FullName],
    PhoneNumber: admin[newAdminSchema.AdminPhone],
    Mail: admin[newAdminSchema.AdminMail],
    Role: admin[newAdminSchema.Role],
    LastLogin: admin[newAdminSchema.LastLogin],
    Status: admin[newAdminSchema.Status] ? "Active" : "Offline",
  }))

  const data = adminData.slice(firstPostIndex, lastPostIndex)
  const activeAdmin = adminData.filter((adminData) => adminData[newAdminSchema.Status] === true).length;
  const inactiveAdmin = adminData.filter((adminData) => adminData[newAdminSchema.Status] === false).length;

  return (
    <div className="flex p-[30px] bg-white rounded-[20px] flex-col gap-[20px] " >
      <div className="flex justify-between items-center h-[40px]">
       <SearchBar search={search} setSearch={setSearch} />
        <div className="flex gap-2.5 ">
          <button className='bg-[#00B806] custombutton' onClick={(adminToggle)}>+ Add New Admin</button>
          <button
            className='bg-[#FF6A00] custombutton'
            onClick={() => {
              handleExportCsv(adminData, unparse, "adminData.csv")
              
            }}
          >Export CSV</button>
        </div>

      </div>

      <div className='h-[74px] relative flex justify-between items-center'>
        <div className='w-[478px] flex justify-between items-center'>
          <div className='bg-[#FFF3E6] w-[150px] rounded-[14px]  py-2.5 px-5 flex flex-col  gap-1.5'>
            <p className='text-[12px]'>Total Admins</p>
            <div className=' relative flex  justify-between items-center'>
              <p className='text-[#FF6A00] text-[20px]'>{adminData.length}</p>
              <Navigate className={'absolute right-0 bottom-1 text-[#838383] w-[12.5px] h-[12.5px] border rounded-full p-[1.5px]'} />
            </div>
          </div>
          <div className='bg-[#E6F8EF] w-[150px] rounded-[14px]  py-2.5 px-5 flex flex-col  gap-1.5'>
            <p className='text-[12px]'>Active Admins</p>
            <div className=' relative flex  justify-between items-center'>
              <p className='text-[#00B806] text-[20px]'>{activeAdmin}</p>
              <Navigate className={'absolute right-0 bottom-1 text-[#838383] w-[12.5px] h-[12.5px] border rounded-full p-[1.5px]'} />
            </div>
          </div>
          <div className='bg-[#FFF3E6] w-[150px] rounded-[14px]  py-2.5 px-5 flex flex-col  gap-1.5'>
            <p className='text-[12px]'>Inactive Admins</p>
            <div className=' relative flex  justify-between items-center'>
              <p className='text-[#FF6A00] text-[20px]'>{inactiveAdmin}</p>
              <Navigate className={'absolute right-0 bottom-1 text-[#838383] w-[12.5px] h-[12.5px] border rounded-full p-[1.5px]'} />
            </div>
          </div>
        </div>

        <div className='flex absolute right-0 bottom-0 justify-between  gap-2.5 '>
          <div className='bg-[#F9F9F9] flex items-center rounded-[40px] p-2.5 pl-5 gap-2.5 cursor-pointer'><Filter className='w-[20px] h-[20px]   text-[#838383]' /> <p className='text-[12px] text-black'>Filter</p></div>
          <div className='bg-[#F9F9F9] flex items-center rounded-[40px] p-2.5 pl-5 gap-2.5 cursor-pointer'><Refresh className='w-[20px] h-[20px]   text-[#FF6A00]' /><p className='text-[12px] text-[#838383]'>Refresh</p></div>
        </div>
      </div>

      <hr className='border-[1px] border-[#EEEDED]' />

      <div className="border border-[#EEEDED] rounded-[20px] overflow-hidden">
        <div className="overflow-y-auto max-h-[345px]">
          <table className="w-full custom-poppins border-collapse">
            <thead className="bg-[#FFECDE] sticky top-0 z-10">
              <tr className="h-[46px] text-left text-black text-[12px]">
                <th className="p-2.5 pl-6 font-normal">Admin ID</th>
                <th className="p-2.5 font-normal">Admin Name</th>
                <th className="p-2.5 font-normal">Phone</th>
                <th className="p-2.5 font-normal">Registered Email</th>
                <th className="p-2.5 font-normal">Role / Designation</th>
                <th className="p-2.5 font-normal">Last Login</th>
                <th className="p-2.5 font-normal">Status</th>
                <th className="p-2.5 font-normal">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.map((admin) => (
                <tr key={admin.id} className="h-[38px] border-[#EDEDED] text-black">
                  <td className="text-[12px] p-2.5 pl-6">
                    #{admin[newAdminSchema.AdminId]}
                  </td>

                  <td className="text-[12px] p-2.5">
                    {admin[newAdminSchema.FullName]}
                  </td>

                  <td className="text-[12px] p-2.5">
                    {admin[newAdminSchema.AdminPhone]}
                  </td>

                  <td className="text-[12px] p-2.5">
                    {admin[newAdminSchema.AdminMail]}
                  </td>

                  <td className="text-[12px] p-2.5">
                    {admin[newAdminSchema.Role]}
                  </td>

                  <td className="text-[12px] p-2.5">
                    {admin[newAdminSchema.LastLogin]}
                  </td>

                  <td className="text-[12px] p-2.5">
                    {admin[newAdminSchema.Status] ? "Active" : "Offline"}
                  </td>

                  <td className="p-2.5">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 cursor-pointer text-[#5AC8FA] hover:scale-110 transition" />
                      <UserX className="w-5 h-5 cursor-pointer text-[#FF0000] hover:scale-110 transition" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-5 h-[30px]">
        <p className="text-[#838383] text-[12px]">Items / page</p>

        <select
          onChange={(e) => {
            setPostPerPage(Number(e.target.value))
            setCurrentPage(1) // reset page when items per page change
          }}
          value={postPerPage}
          className="bg-[#F9F9F9] rounded-[10px] px-2 py-1 text-[12px]"
        >
          {[...Array(50)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* LEFT ARROW */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`bg-[#F9F9F9] rounded-[10px] p-2.5 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FFE9D7]"
              }`}
          >
            <LeftArrow className="text-[#838383] w-4 h-4" />
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex items-center gap-1">
            {Array.from(
              { length: Math.ceil(adminData.length / postPerPage) },
              (_, i) => i + 1
            ).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 text-[12px] rounded-[8px] transition ${currentPage === pageNum
                  ? "bg-[#FF6A00] text-white"
                  : "bg-[#F9F9F9] text-[#838383] hover:bg-[#FFE9D7]"
                  }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            disabled={currentPage === Math.ceil(adminData.length / postPerPage)}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(adminData.length / postPerPage))
              )
            }
            className={`bg-[#F9F9F9] rounded-[10px] p-2.5 ${currentPage === Math.ceil(adminData.length / postPerPage)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#FFE9D7]"
              }`}
          >
            <RightArrow className="text-[#838383] w-4 h-4" />
          </button>
        </div>
      </div>

    </div >



  )
}

export default AdminManagement


export const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative min-w-[320px] h-[48px]] rounded-[40px] flex flex-col gap-2.5">
      <Search className="absolute w-6 h-6 top-1.5 left-4 text-orange-400" />
      <input
        type="text"
        placeholder="Search by property, name, Id or City"
        className="w-full custom-poppins text-[12px] bg-[#F9F9F9] text-[#838383] py-2.5 px-12  outline-none rounded-[40px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
