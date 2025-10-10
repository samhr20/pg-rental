import React, { useState } from 'react'
import NoRole from '../../public/svg/NoRole.svg?react'
import { NavLink } from 'react-router-dom'
import useData from '../context/DataFetchContext'

const ManageRoles = () => {
    const { allRoles } = useData()
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
                <div className='flex justify-center items-center h-full text-black bg-white rounded-[20px] '>
                    <div>

                        {allRoles.map((i) => (
                            <p key={i.id}>{i.Role}</p>
                        ))}
                    </div>
                </div>
            )


            }
        </>
    )
}

export default ManageRoles