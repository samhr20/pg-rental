import axios from 'axios'
import React, { useState } from 'react'
import useData from '../context/DataFetchContext'

const AddNewRole = () => {
    const [role, setRole] = useState('')
    const [roleDes, setRoleDes] = useState('')
    const { allRoles, setAllRoles } = useData();

    const submitHandler = async (e) => {
        e.preventDefault()

        const newRole = {
            Role: role,
            RoleDes: roleDes
        }

        try {
            const res = await axios.post('http://localhost:3000/Roles', newRole)
            setAllRoles([...allRoles, res.data])
        } catch (error) {
            console.error(error)
        }

        setRole('')
        setRoleDes('')

    }


    return (
        <div className='flex flex-col p-[30px] gap-4 h-full bg-white rounded-[20px] '>
            <h3 className='text-black custom-medium text-[18px]'>Create New Role</h3>
            <hr className='border border-[#EEEDED] ' />

            <form
                onSubmit={submitHandler}
                className='bg-black p-2.5 text-white' >
                <p>Role</p>
                <input type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className='customInput'
                />
                <p>Des</p>
                <input type="text"
                    value={roleDes}
                    onChange={(e) => setRoleDes(e.target.value)}
                    className='customInput'
                />
                <br />
                <button type='submit'
                    className='bg-amber-500'
                >Submit</button>
            </form>

            {allRoles.map((i) => (
                <p>{i.Role}</p>
            ))}

        </div>

    )
}

export default AddNewRole