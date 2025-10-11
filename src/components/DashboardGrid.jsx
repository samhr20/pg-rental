import React from 'react'
import Booking from '../../public/svg/Booking.svg?react'
import Rupee from '../../public/svg/Rupee.svg?react'
import User from '../../public/svg/User.svg?react'
import Property from '../../public/svg/Property.svg?react'
import CashMove from '../../public/svg/CashMove.svg?react'
import useData from '../context/DataFetchContext'
import { dashboardGridDataSchema } from '../helpers/user_enum'


const DashboardGrid = () => {

    const { gridData } = useData()

    const iconComponent = {
        Booking: Booking,
        Rupee: Rupee,
        User: User,
        Property: Property,
        CashMove: CashMove
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[20px] w-full'>

            {gridData.map((data, key) => {
                const IconComponent = iconComponent[data[dashboardGridDataSchema.icon]];
                return (
                    <div key={key} className='bg-white border border-[#EEEDED] gap-[14px] rounded-[14px] p-[20px] flex flex-col min-h-[155px]'>
                        <div className='flex w-full gap-5 items-center'>
                            <div className={`rounded-[10px] py-[7px] px-[10px] gap-2.5 w-10 flex items-center justify-center h-10 ${data[dashboardGridDataSchema.iconBoxColor]}`}>
                                <IconComponent className={`w-[18px] h-[18px] ${data[dashboardGridDataSchema.iconColor]}`} />
                            </div>
                            <p className='leading-[130%] tracking-[0%] text-black text-[14px] flex-1'>{data[dashboardGridDataSchema.textOne]} <br /> {data[dashboardGridDataSchema.textTwo]}</p>
                        </div>

                        <h4 className='w-full text-black h-[30px] text-[20px] leading-[100%] tracking-[0%] break-words'>{data[dashboardGridDataSchema.data]}</h4>
                        <h4 className='w-full h-[15px] text-[10px] leading-[100%] tracking-[0%] text-[#838383]'>{data[dashboardGridDataSchema.number]} {data[dashboardGridDataSchema.text]}</h4>
                    </div>
                )
            })}

        </div>
    )
}

export default DashboardGrid