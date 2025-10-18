import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { rolesPermissionFeatureSchema, rolesPermissionSchema, rolesSchema } from '../helpers/user_enum'
import { useNavigate } from 'react-router-dom'
import useAdminManagement from '../context/AdminManagementContext'

const AddNewRole = () => {

    const initialState = {
        [rolesSchema.role]: "",
        [rolesSchema.roleDes]: "",
        [rolesSchema.createdOn]: "",
        [rolesSchema.activeStatus]: false,
        [rolesSchema.permissions]: [
            {
                [rolesPermissionSchema.module]: "Admin Management",
                [rolesPermissionSchema.moduleDes]: "Add, manage, and set permissions for admin users.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Properties Management",
                [rolesPermissionSchema.moduleDes]: "Manage listing of all properties including add, edit, verify, block, delete, view.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Bookings Management",
                [rolesPermissionSchema.moduleDes]: "View and manage all room/PG booking requests.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Partners Management",
                [rolesPermissionSchema.moduleDes]: "Manage PG/room owners using the platform.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Tenants Management",
                [rolesPermissionSchema.moduleDes]: "Manage users looking to book rooms/PGs.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Complaints Management",
                [rolesPermissionSchema.moduleDes]: "Track and resolve tenant and partner complaints.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Transactions & Payouts",
                [rolesPermissionSchema.moduleDes]: "View platform earnings, commissions, and withdrawals.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Reports & Analytics",
                [rolesPermissionSchema.moduleDes]: "View downloadable and graphical reports on platform activity.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Promotions & Ads",
                [rolesPermissionSchema.moduleDes]: "Promote partner properties or run banner ads.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Membership Management",
                [rolesPermissionSchema.moduleDes]: "Handle subscription-based premium features.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Notifications Management",
                [rolesPermissionSchema.moduleDes]: "Manage system-generated or manual notifications.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },
            {
                [rolesPermissionSchema.module]: "Settings & Configurations",
                [rolesPermissionSchema.moduleDes]: "Platform-wide setup and configuration settings.",
                [rolesPermissionSchema.features]: {
                    [rolesPermissionFeatureSchema.view]: false,
                    [rolesPermissionFeatureSchema.create]: false,
                    [rolesPermissionFeatureSchema.edit]: false,
                    [rolesPermissionFeatureSchema.delete]: false,
                    [rolesPermissionFeatureSchema.status]: false
                }
            },

        ]
    }

    const { setAllRoles } = useAdminManagement();
    const [roleData, setRoleData] = useState(initialState)
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target
        setRoleData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handlePermissionChange = (feature, moduleindex) => {

        setRoleData((roleData) => {
            const permissions = [...roleData[rolesSchema.permissions]]
            const selectModule = { ...permissions[moduleindex] }
            const updateFeature = { ...selectModule[rolesPermissionSchema.features] }
            updateFeature[feature] = !updateFeature[feature]
            selectModule[rolesPermissionSchema.features] = updateFeature
            permissions[moduleindex] = selectModule


            return {
                ...roleData,
                [rolesSchema.permissions]: permissions
            }
        })


    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const created = new Date()
        const options = {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
        roleData[rolesSchema.createdOn] = created.toLocaleDateString('en-GB', options)

        try {
            const res = await axios.post('/Roles', roleData)
            setAllRoles((prev) => [...prev, roleData])
            setRoleData(initialState)
            alert('Role Creation Successfull...')
        } catch (error) {
            console.error(error);

        }
    }

    const cancel = ()=>{
        navigate('/admin-management/manage-roles')
        setRoleData(initialState)
    }


    return (
        <div className='flex flex-col gap-4 '>

            <div className='flex flex-col p-[30px] gap-4 h-full bg-white rounded-[20px] '>
                <h3 className='text-black custom-medium text-[18px]'>Create New Role</h3>
                <hr className='border border-[#EEEDED] ' />

                <form id="addRoleForm" onSubmit={submitHandler}
                    className='flex flex-col gap-4'  >
                    <div className='flex justify-between items-center'  >
                        <div className='min-w-[400px] flex flex-col gap-4'>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] custom-poppins ">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    name={rolesSchema.role}
                                    value={roleData[rolesSchema.role]}
                                    onChange={handleInputChange}
                                    placeholder="Enter Full Name"
                                    required
                                    className="w-full h-[48px] rounded-[40px] py-[10px] px-5  bg-[#F9F9F9]  text-black text-[12px] outline-none transition"
                                />
                            </div>
                            <div className='h-[20px] flex justify-between items-center w-[148px]'>
                                <label className="text-[12px] text-[#838383] custom-poppins ">
                                    Active Status
                                </label>
                                <input
                                    type="checkbox"
                                    name={rolesSchema.activeStatus}
                                    checked={roleData[rolesSchema.activeStatus]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='min-w-[640px]'>
                            <label className="text-[12px] text-[#000000] custom-poppins ">
                                Role Description
                            </label>
                            <textarea
                                placeholder="Provide any reason or note for the status update"
                                className="w-full custom-poppins h-[100px] rounded-[20px] py-[10px] px-5 bg-[#F9F9F9] text-[#838383] text-[12px] outline-none transition resize-none"
                                name={rolesSchema.roleDes}
                                value={roleData[rolesSchema.roleDes]}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <hr className='border border-[#EEEDED] ' />

                    <div className='flex flex-col gap-4' >
                        <h2 className='custom-poppins text-[14px]'>Permission Assignment</h2>
                        <div className="border border-[#EEEDED] rounded-[20px] overflow-hidden">
                            <div className="overflow-y-auto max-h-[450px]">
                                <table className="w-full custom-poppins border-collapse">
                                    <thead className="bg-[#FFECDE] sticky top-0 z-10">
                                        <tr className="h-[38px] text-center text-black text-[12px]">
                                            <th className="min-w-[460px] p-2.5 pl-5 font-normal text-left ">Module / Feature</th>
                                            <th className="min-w-[120px] p-2.5 font-normal ">View</th>
                                            <th className="min-w-[120px] p-2.5 font-normal ">Create</th>
                                            <th className="min-w-[120px] p-2.5 font-normal ">Edit</th>
                                            <th className="min-w-[120px] p-2.5 font-normal ">Delete</th>
                                            <th className="min-w-[120px] p-2.5 font-normal ">Status / Action </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white">
                                        {roleData[rolesSchema.permissions].map((permissions, index) => (
                                            <tr
                                                className='min-w-[1060px] min-h-[57px]'
                                                key={index}
                                            >
                                                <td
                                                    className='min-w-[460px] p-2.5 pl-5 gap-1 flex flex-col '
                                                >
                                                    <span className='custom-poppins text-[12px] text-black'> {permissions[rolesPermissionSchema.module]}</span>
                                                    <span className='custom-poppins text-[10px] text-[#838383]'> {permissions[rolesPermissionSchema.moduleDes]}</span>
                                                </td>
                                                {Object.keys(permissions[rolesPermissionSchema.features]).map((feature, featuresIndex) => (
                                                    <td
                                                        className='min-w-[120px] text-center p-2.5    '
                                                        key={featuresIndex}>
                                                        <input type="checkbox"
                                                            name={rolesPermissionSchema.features[feature]}
                                                            checked={permissions[rolesPermissionSchema.features][feature]}
                                                            onChange={() => handlePermissionChange(feature, index)}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
            <div className='flex h-[40px] justify-end gap-5 '>

                <button
                    type="button"
                    className="w-full max-w-[180px] h-[40px] rounded-[50px] border border-[#FF6A00] text-[#FF6A00]
                custom-medium py-[10px] px-2.5 text-[14px]  hover:bg-[#fff1e8] transition cursor-pointer"
               onClick={cancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    form="addRoleForm"
                    className=" w-full max-w-[180px] h-[40px] rounded-[50px]  bg-[#FF6A00] text-white text-[14px]  hover:bg-[#ff8c32] transition cursor-pointer"
                >
                    Create Role
                </button>
            </div>

        </div>


    )
}

export default AddNewRole