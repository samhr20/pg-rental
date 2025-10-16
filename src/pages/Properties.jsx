import React from 'react'
import useProperties from '../context/PropertiesContext'
import { locationDetailsSchema, photosAndMediaSchema, propertySchema, propertyTypeStructureSchema, rentAndPriceSchema } from '../helpers/properties_enum'
import { SearchBar } from './AdminManagement'
import Sort from '../../public/svg/Sort.svg?react'
import Filter from '../../public/svg/Filter.svg?react'
import Address from '../../public/svg/Address.svg?react'
import Star from '../../public/svg/Star.svg?react'
import Wifi from '../../public/svg/Wifi.svg?react'
import Bed from '../../public/svg/Bed.svg?react'
import Bus from '../../public/svg/Bus.svg?react'
import { Link, NavLink } from 'react-router-dom'


const Properties = () => {
    const { properties } = useProperties()
    return (
        <div className='flex flex-col p-[30px] gap-4 h-full bg-white rounded-[20px] '>
            <div className='flex justify-between items-center min-w-[1060ox] min-h-[48px] gap-5 '>
                <p className='text-[14px] custom-poppins text-[#838383]'>Showing {properties.length} of {properties.length}</p>
                <div className='flex items-center gap-5'>
                    <SearchBar />
                    <div className='flex items-center justify-between gap-5'>
                        <Filter className="w-[48px] h-[48px] rounded-[40px] py-3 px-3 text-[#838383] cursor-pointer bg-[#FFECDE]" />
                        <Sort className="w-[48px] h-[48px] rounded-[40px] py-3 px-3 text-[#838383] cursor-pointer bg-[#FFECDE]" />
                    </div>
                </div>
            </div>
            <hr className='border border-[#EEEDED]' />
            {/* Filters Will be Here */}

            <div>

            </div>

            <div className="grid grid-cols-4 min-w-[1060px] space-x-4 space-y-4 overflow-y-scroll ">

                {properties.map((item) => {

                    const randomImageGetter = Math.floor(
                        Math.random() *
                        item[propertySchema.photosAndMedia][photosAndMediaSchema.images].length
                    )
                    const rent =
                        item[propertySchema.rentAndPrice][rentAndPriceSchema.tripleSharing] ??
                        item[propertySchema.rentAndPrice][rentAndPriceSchema.doubleSharing] ??
                        item[propertySchema.rentAndPrice][rentAndPriceSchema.privateRoom] ??
                        0;
                    return (    
                      <Link
                      to={`/properties/${item[propertySchema.propertyId]}`}
                      >
                        <div className='cursor-pointer relative min-w-[250px] min-h-[286px] rounded-[16px] border border-[#EEEDED] p-1.5 pb-4 flex flex-col gap-2.5'>
                            <div >
                                <img src={item[propertySchema.photosAndMedia][photosAndMediaSchema.images][randomImageGetter]}
                                    className='object-cover rounded-[10px] w-full min-w-[238px] h-[120px]'
                                />
                            </div>

                            <div className='flex flex-col gap-2.5 px-1.5'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-[14px] custom-semibold'>{item[propertySchema.propertyName]}</p>
                                    <p className='custom-semibold text-[14px]'>{rent}<span className='custom-light text-[10px]'>/Mo</span></p>
                                </div>
                                <p className='text-[#838383] text-[12px] custom-poppins'>Listed on: {item[propertySchema.listedOn].split(",")[0]}</p>

                                <div className="whitespace-nowrap ">
                                    <span className="inline-flex gap-2.5 pr-2.5">
                                        {Object.values((item[propertySchema.propertyTypeStructure][propertyTypeStructureSchema.roomsAvailable])).map((rooms) => (
                                            <p className='bg-[#FFECDE] rounded-[20px] py-0.5 px-1.5 custom-poppins text-[10px] text-[#FF6A00]'>{rooms}</p>
                                        ))}
                                    </span>

                                </div>
                                <div className="flex w-full items-center min-w-[158px] h-[18px] gap-[5px] ">
                                    <Address className="w-[18px] h-[18px] text-[#838383]" />
                                    <div className=" w-full overflow-hidden">
                                        <p className="text-[#838383] text-[12px] custom-poppins whitespace-nowrap ">
                                            {item[propertySchema.locationDetails][locationDetailsSchema.address]},
                                            {item[propertySchema.locationDetails][locationDetailsSchema.city]}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-[5px]'>
                                        <Star className="w-[14px] h-[14px] text-[#FF6A00]" />
                                        <p className='text-[10px]'>3.5</p>
                                    </div>
                                    <div className='flex gap-[5px]'>
                                        <Bus className="w-[16px] h-[16px] text-[#838383]" />
                                        <p className='text-[12px] text-[#838383]'>600 m</p>
                                    </div>
                                    <div className='flex gap-[5px]'>
                                        <Bed className="w-[16px] h-[16px] text-[#838383]" />
                                        <p className='text-[12px] text-[#838383]'>02</p>
                                    </div>
                                    <Wifi className="w-[16px] h-[16px] text-[#00B806]" />
                                </div>
                            </div>

                            <div className='absolute top-25 left-0 bg-[#FF6A00] min-w-[63px] min-h-[19px] rounded-tr-[20px] rounded-br-[20px] py-0.5 pr-1.5 pl-3 flex flex-col gap-2.5'>
                                <p className='text-[10px] text-white custom-poppins'>Featured</p>
                            </div>
                            <div className='absolute right-3 top-3 min-w-[78px] min-h-[19px] rounded-[20px] py-0.5 px-1.5 flex flex-col gap-2.5 bg-[#00B806]'>
                                <p className='text-[10px] text-white custom-poppins'>Paying Guest</p>
                            </div>
                            <div className='absolute right-3 top-10 min-w-[61px] min-h-[19px] rounded-[20px] py-0.5 px-1.5 flex flex-col gap-2.5 bg-[#0022FF]'>
                                <p className='text-[10px] text-white custom-poppins'> Approved</p>
                            </div>

                        </div>
                      </Link>
            )
                })}

        </div>
        </div >
    )
}

export default Properties