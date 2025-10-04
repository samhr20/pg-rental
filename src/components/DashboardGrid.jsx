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
        <div className='flex flex-wrap gap-[20px]'>

            {DashboardGridData.map((data, key) => {
                const IconComponent = iconComponent[data.icon];
                return (
                    <div key={key} className='bg-white lg:w-[204px] lg:h-[155px] border border-[#EEEDED] gap-[14px] rounded-[14px] p-[20px] flex flex-col   '>
                        <div className='flex w-[164px] h-[42px] gap-5 items-center'>
                            <div className={` rounded-[10px] py-[7px] px-[10px] gap-2.5 w-10 flex items-center justify-center h-10 ${data.iconBoxColor}
                        `}>
                                <IconComponent className={`w-[18px] h-[18px] ${data.iconColor}`} />
                            </div>
                            <p className=' leading-[130%] tracking-[0%] text-black text-[14px]'>{data.textOne} <br /> {data.textTwo}</p>
                        </div>

                        <h4 className='w-[164px] text-black h-[30px] text-[20px] leading-[100%] tracking-[0%] break-words'>{data.data}</h4>
                        <h4 className='w-[164px] h-[15px] text-[10px] leading-[100%] tracking-[0%] text-[#838383]'>{data.number} {data.text}</h4>
                    </div>
                )
            })}

        </div>
    )
}

export default DashboardGrid