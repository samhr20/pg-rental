import React, { useState } from 'react'
import NoRole from '../../public/svg/NoRole.svg?react'
import { Link, NavLink } from 'react-router-dom'
import Search from '../../public/svg/Search.svg?react'
import Filter from '../../public/svg/Filter.svg?react'
import Refresh from '../../public/svg/Refresh.svg?react'
import Eye from '../../public/svg/Eye.svg?react'
import Pencil from '../../public/svg/Pencil.svg?react'
import Delete from '../../public/svg/Delete.svg?react'
import useAdminManagement from '../context/AdminManagementContext'
import LeftArrow from '../../public/svg/LeftArrow.svg?react'
import RightArrow from '../../public/svg/RightArrow.svg?react'
import { newAdminSchema, rolesPermissionSchema, rolesSchema } from '../helpers/user_enum'

const ManageRoles = () => {
    const { allRoles, adminData } = useAdminManagement()
    const [search, setSearch] = useState('')
    const [postPerPage, setPostPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const lastPostIndex = postPerPage * currentPage;
    const firstPostIndex = lastPostIndex - postPerPage

    const data = allRoles.slice(firstPostIndex, lastPostIndex)


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

                <div className="flex p-[30px] h-full bg-white rounded-[20px] flex-col gap-[20px] ">
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
                                        <th className="min-w-[180px] p-2.5 pl-5 font-normal">Role Name</th>
                                        <th className="p-2.5 font-normal">Description</th>
                                        <th className="min-w-[140px] p-2.5 font-normal">Assigned Admins</th>
                                        <th className="p-2.5 font-normal">Permissions Summary</th>
                                        <th className="min-w-[140px] p-2.5 font-normal">Created On</th>
                                        <th className="min-w-[140px] p-2.5 font-normal">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((item, index) => {

                                        const assignedAdmins = adminData.filter(
                                            (admin) => admin[newAdminSchema.Role] === item[rolesSchema.role]
                                        )

                                        const notAllPermissions = item[rolesSchema.permissions]
                                            .filter((module) =>
                                                Object.values(module[rolesPermissionSchema.features])
                                                    .some((values) => values === true))
                                            .map((module) => module[rolesPermissionSchema.module].split(" ")[0])

                                        const isAllPermissions = item[rolesSchema.permissions]
                                            .every((module) =>
                                                Object.values(module[rolesPermissionSchema.features]).every((value) => value === true))

                                        const permissions = isAllPermissions ? "All Permissions" : notAllPermissions.length > 0 ? notAllPermissions.join(", ") : "No permissions"

                                        return (
                                            <tr
                                                className='h-[46px] '
                                                key={index}>
                                                <td className="p-2.5 pl-5 min-w-[180px] text-[12px] ">{item[rolesSchema.role]}</td>
                                                <td className="p-2.5 text-[12px]">{item[rolesSchema.roleDes]}</td>

                                                <td className="p-2.5 text-[12px] ">
                                                    {assignedAdmins.length}
                                                </td>

                                                <td className="p-2.5 text-[12px] ">
                                                    {permissions}
                                                </td>
                                                <td className="p-2.5 text-[12px] ">{item[rolesSchema.createdOn]}</td>
                                                <td className='flex gap-[20px] p-2.5'>
                                                    <Eye className={" w-5 h-5 text-[#5AC8FA] cursor-pointer"} />
                                                    <Pencil className={"w-5 h-5 text-[#34C759] cursor-pointer"} />
                                                    <Delete className={" w-5 h-5 text-[#FF0000] cursor-pointer"} />
                                                </td>
                                            </tr>
                                        )
                                    })}
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
                                    { length: Math.ceil(allRoles.length / postPerPage) },
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
                                disabled={currentPage === Math.ceil(allRoles.length / postPerPage)}
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, Math.ceil(allRoles.length / postPerPage))
                                    )
                                }
                                className={`bg-[#F9F9F9] rounded-[10px] p-2.5 ${currentPage === Math.ceil(allRoles.length / postPerPage)
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-[#FFE9D7]"
                                    }`}
                            >
                                <RightArrow className="text-[#838383] w-4 h-4" />
                            </button>
                        </div>
                    </div>


                </div>
            )


            }
        </>
    )
}

export default ManageRoles