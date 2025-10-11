import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useData from '../context/DataFetchContext'
import { rolesPermissionFeatureSchema, rolesPermissionSchema, rolesSchema } from '../helpers/user_enum'

const AddNewRole = () => {

    const initialState = {
        [rolesSchema.role]: "",
        [rolesSchema.roleDes]: "",
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



    const { allRoles, setAllRoles } = useData();
    const [roleData, setRoleData] = useState(initialState)


    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setRoleData((roleData) => {
            return {
                ...roleData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const handlePermissionChange = (moduleIndex, feature) => {
        setRoleData((roleData) => {
            const newPermission = [...roleData[rolesSchema.permissions]]
            const selectModule = { ...newPermission[moduleIndex] };
            const updateFeature = { ...selectModule[rolesPermissionSchema.features] }
            updateFeature[feature] = !updateFeature[feature]
            selectModule[rolesPermissionSchema.features] = updateFeature
            newPermission[moduleIndex] = selectModule

            return {
                ...roleData,
                [rolesSchema.permissions]: newPermission
            }
        })

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/Roles', roleData);
            setAllRoles((prev) => [...prev, roleData]);
            setRoleData(initialState);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='flex flex-col p-[30px] gap-4 h-full bg-white rounded-[20px] '>
            <h3 className='text-black custom-medium text-[18px]'>Create New Role</h3>
            <hr className='border border-[#EEEDED] ' />

            <form onSubmit={submitHandler}
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
                                placeholder="Enter Full Name"
                                className="w-full h-[48px] rounded-[40px] py-[10px] px-5  bg-[#F9F9F9]  text-black text-[12px] outline-none transition"
                                value={roleData[rolesSchema.role]}
                                onChange={handleInputChange}
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
                            name={rolesSchema.roleDes}
                            placeholder="Provide any reason or note for the status update"
                            className="w-full custom-poppins h-[100px] rounded-[20px] py-[10px] px-5 bg-[#F9F9F9] text-[#838383] text-[12px] outline-none transition resize-none"
                            value={roleData[rolesSchema.roleDes]}
                            onChange={handleInputChange}
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
                                    <tr className="h-[38px] text-left text-black text-[12px]">
                                        <th className="min-w-[460px] p-2.5 pl-5 font-normal">Module / Feature</th>
                                        <th className="min-w-[120px] p-2.5 font-normal">View</th>
                                        <th className="min-w-[120px] p-2.5 font-normal">Create</th>
                                        <th className="min-w-[120px] p-2.5 font-normal">Edit</th>
                                        <th className="min-w-[120px] p-2.5 font-normal">Delete</th>
                                        <th className="min-w-[120px] p-2.5 font-normal">Status / Action </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {roleData[rolesSchema.permissions].map((module, moduleIndex) => (
                                        <tr key={moduleIndex}>
                                            <td>{module[rolesPermissionSchema.module]}</td>
                                            {Object.keys(module[rolesPermissionSchema.features]).map((feature, featureIndex) => (
                                                <td key={featureIndex}>
                                                    <input
                                                        type="checkbox"
                                                        checked={module[rolesPermissionSchema.features][feature]}
                                                        onChange={() => handlePermissionChange(moduleIndex, feature)}
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

                <button type="submit">submit</button>
            </form>
            {allRoles && allRoles.map((i) => (
                <div>
                    {i[rolesSchema.role]}
                </div>
            ))}

        </div >

    )
}

export default AddNewRole