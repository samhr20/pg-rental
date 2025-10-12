import React, { useState } from 'react'
import NoRole from '../../public/svg/NoRole.svg?react'
import { Link, NavLink } from 'react-router-dom'
import Search from '../../public/svg/Search.svg?react'
import Filter from '../../public/svg/Filter.svg?react'
import Refresh from '../../public/svg/Refresh.svg?react'
import useAdminManagement from '../context/AdminManagementContext'

const ManageRoles = () => {
    const { allRoles } = useAdminManagement()
    const [search, setSearch] = useState('')
    return (
        <>
            {allRoles.length === 0 ? (
                <div className='flex justify-center items-center h-full bg-white rounded-[20px] '>
                    <div className='flex flex-col justify-center items-center w-[360px] gap-3.5'>
                        <NoRole className='' />
                        <h5 className='text-[#FF6A00] text-center text-[20px]'>No Roles Have Been Created Yet</h5>
                        <h5 className='text-[#838383] text-center text-[12px]'>Start by defining roles with specific permissions to manage your platform securely and efficiently.</h5>
                        <NavLink
                            to={'/admin-management/add-new-role'}
                        >
                            <button className='w-[180px] h-[40px] rounded-[50px] border border-[#FF6A00] py-2.5  text-[#FF6A00] text-[14px] cursor-pointer custom-medium'>
                                + Create First Role
                            </button>
                        </NavLink>
                    </div>
                </div>
            ) : (

                <div className="flex p-[30px] bg-white rounded-[20px] flex-col gap-[20px] ">
                    <div className="  flex justify-between items-center h-[40px]">
                        <div className=" relative min-w-[320px] rounded-[40px]  flex flex-col gap-2.5">
                            <Search className="absolute w-6 h-6 top-1.5 left-2 text-orange-400" />
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
                        <div className='flex justify-between items-center gap-2.5 '>
                            <div className='bg-[#F9F9F9]  flex items-center rounded-[40px] p-2.5 pl-5 gap-2.5 cursor-pointer'><Filter className='w-[20px] h-[20px]   text-[#838383]' /> <p className='text-[12px] text-black'>Filter</p></div>
                            <div className='bg-[#F9F9F9]  flex items-center rounded-[40px] p-2.5 pl-5 gap-2.5 cursor-pointer'><Refresh className='w-[20px] h-[20px]   text-[#FF6A00]' /><p className='text-[12px] text-[#838383]'>Refresh</p></div>
                            <Link
                                to={'/admin-management/add-new-role'}
                            >
                                <button className='h-[40px] rounded-[40px] py-2.5 px-5 flex flex-col gap-2.5 bg-[#FF6A00] text-white text-[12px] custom-poppins cursor-pointer'>+ Add New Role</button>
                            </Link>
                        </div>
                    </div>

                    <hr className='border border-[#EEEDED] w-full' />


                    <div className="border border-[#EEEDED] rounded-[20px] overflow-hidden">
                        <div className="overflow-y-auto max-h-[345px]">
                            <table className="w-full custom-poppins border-collapse">
                                <thead className="bg-[#FFECDE] sticky top-0 z-10">
                                    <tr className="h-[46px] text-left text-black text-[12px]">
                                        <th className="p-2.5 pl-6 font-normal">Role Name</th>
                                        <th className="p-2.5 font-normal">Description</th>
                                        <th className="p-2.5 font-normal">Assigned Admins</th>
                                        <th className="p-2.5 font-normal">Permissions Summary</th>
                                        <th className="p-2.5 font-normal">Created On</th>
                                        <th className="p-2.5 font-normal">Actions</th>
                                    </tr>
                                </thead>

                                {/* <tbody className="bg-white">
                                    {data.map((admin) => (
                                        <tr
                                            key={admin.AdminId}
                                            className=" h-[38px] border-[#EDEDED] text-black"
                                        >
                                            <td className="text-[12px] p-2.5 pl-6">#{admin.AdminId}</td>
                                            <td className="text-[12px] p-2.5">{admin.FullName}</td>
                                            <td className="text-[12px] p-2.5">{admin.AdminPhone}</td>
                                            <td className="text-[12px] p-2.5">{admin.AdminMail}</td>
                                            <td className="text-[12px] p-2.5">{admin.Role}</td>
                                            <td className="text-[12px] p-2.5">{admin.LastLogin}</td>
                                            <td className="text-[12px] p-2.5">
                                                <span > {admin.Status === true ? 'Active' : 'Offline'}
                                                </span>
                                            </td>
                                            <td className="p-2.5">
                                                <div className="flex items-center gap-3">
                                                    <Eye className="w-5 h-5 cursor-pointer text-[#5AC8FA] hover:scale-110 transition" />
                                                    <UserX className="w-5 h-5 cursor-pointer text-[#FF0000] hover:scale-110 transition"
                                                    />

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                            </table>
                        </div>
                    </div>





                </div>
            )


            }
        </>
    )
}

export default ManageRoles