import React from 'react'
import Booking from '../../public/svg/Booking.svg?react'
import Rupee from '../../public/svg/Rupee.svg?react'
import User from '../../public/svg/User.svg?react'
import Property from '../../public/svg/Property.svg?react'
import CashMove from '../../public/svg/CashMove.svg?react'
import DashboardGridData from '../api/DashboardGridData.json'


const DashboardGrid = () => {

    const iconComponent = {
        Booking: Booking,
        Rupee: Rupee,
        User: User,
        Property: Property,
        CashMove: CashMove
    }

    return (
        <div className='mt-7 grid grid-cols-5 gap-10'>

            {DashboardGridData.map((data, key) => {
                const IconComponent = iconComponent[data.icon];
                return (

                    <div key={key} className='bg-white w-[230px] rounded-[14px] p-[12px] border-gray-300 border-[1px]'>
                        <div className='flex gap-5 items-center'>
                            <div className={` rounded-[8px] w-8 flex items-center justify-center h-8 ${data.iconBoxColor}
                        `}>
                                <IconComponent className={`h-4 ${data.iconColor}`} />
                            </div>
                            <p className='font-semibold text-[15px]'>{data.textOne} <br /> {data.textTwo}</p>
                        </div>

                        <h4 className='my-2 text-[22px]'>{data.data}</h4>
                        <h4 className='text-[12px] text-gray-500'>{data.number} {data.text}</h4>
                    </div>
                )
            })}

        </div>
    )
}

export default DashboardGrid