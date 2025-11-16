import React, { useState } from 'react'
import useProperties from '../context/PropertiesContext'
import { SearchBar } from './AdminManagement'
import Sort from '../../public/svg/Sort.svg?react'
import Filter from '../../public/svg/Filter.svg?react'
import Address from '../../public/svg/Address.svg?react'
import Star from '../../public/svg/Star.svg?react'
import Wifi from '../../public/svg/Wifi.svg?react'
import Bed from '../../public/svg/Bed.svg?react'
import Bus from '../../public/svg/Bus.svg?react'
import { Link, NavLink } from 'react-router-dom'
import { locationDetailsSchema, mediaSchema, propertySchema, rentSchema, roomTypesSchema } from '../helpers/properties_enum'


const Properties = () => {
    const { properties, setPropertyFilterIsOpen , filteredProperties  } = useProperties()
    const [sortIsOpen, setSortIsOpen] = useState(false)
    const [sortBy, setSortBy] = useState("Newest First")
    


    const handleSort = (sort) => {
        setSortBy(sort)
        setSortIsOpen(false)
    }


    const sortedProperties  = filteredProperties.length > 0 ? [...filteredProperties] : [...properties]
    switch (sortBy) {
        case 'Newest First':
            sortedProperties.sort((a, b) => new Date(b[propertySchema.listedOn]) - new Date(a[propertySchema.listedOn]));
            break;
        case 'Oldest First':
            sortedProperties.sort((a, b) => new Date(a[propertySchema.listedOn]) - new Date(b[propertySchema.listedOn]));
            break;
        case 'A-Z (Descending)':
            sortedProperties.sort((a, b) => b[propertySchema.propertyName].localeCompare(a[propertySchema.propertyName]));
            break;
        case 'Rent High To Low':
            sortedProperties.sort((a, b) => (b[propertySchema.rent][rentSchema.minRange]) - (a[propertySchema.rent][rentSchema.minRange]));
            break;
        case 'Rent Low To High':
            sortedProperties.sort((a, b) =>  (a[propertySchema.rent][rentSchema.minRange]) - (b[propertySchema.rent][rentSchema.minRange]) );
            break;
        default:
            break;
    }


    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-200 ${sortIsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setSortIsOpen(false)}
            /> 
            {sortedProperties.length < 1 ? (
                <div>loading........</div>
            ):(
            <div className=' flex flex-col p-[30px] gap-4 h-full bg-white rounded-[20px] '>
                <div className='relative flex justify-between items-center min-w-[1060ox] min-h-[48px] gap-5 '>
                    <p className='text-[14px] custom-poppins text-[#838383]'>Showing {sortedProperties.length} of {properties.length}</p>
                    <div className='flex items-center gap-5'>
                        <SearchBar />
                        <div className='flex items-center justify-between gap-5'>
                            <Filter
                                onClick={() => setPropertyFilterIsOpen(true)}
                                className="w-[48px] h-[48px] rounded-[40px] py-3 px-3 text-[#838383] cursor-pointer bg-[#FFECDE]" />
                            <Sort onClick={() => setSortIsOpen((prev) => !prev)}
                                className="w-[48px] h-[48px] rounded-[40px] py-3 px-3 text-[#838383] cursor-pointer bg-[#FFECDE]" />
                        </div>
                    </div>
                    {sortIsOpen && (
                        <div className='fixed right-2 top-40 z-60  custom-poppins text-[12px] text-black bg-white rounded-[20px] p-5 flex flex-col items-start gap-5'>
                            <button onClick={() => handleSort("Newest First")} className='cursor-pointer'>Newest First</button>
                            <button onClick={() => handleSort("Oldest First")} className='cursor-pointer'>Oldest First</button>
                            <button onClick={() => handleSort("A-Z (Descending)")} className='cursor-pointer'>A-Z (Decending)</button>
                            <button onClick={() => handleSort("Rent High To Low")} className='cursor-pointer'>Rent High to Low</button>
                            <button onClick={() => handleSort("Rent Low To High")} className='cursor-pointer'>Rent Low to High</button>
                        </div>

                    )}
                </div>


                <hr className='border border-[#EEEDED]' />
                {/* Filters Will be Here */}

                <div>
                </div>

                <div className="grid grid-cols-4 min-w-[1060px] space-x-4 space-y-4 overflow-y-scroll ">

                    {sortedProperties.map((item, key) => {

                        const randomImageGetter = Math.floor(
                            Math.random() *
                            item[propertySchema.media][mediaSchema.images].length
                        )
                    
                        return (
                            <Link
                                key={key || item[propertySchema.propertyId]}
                                to={`/properties/${item[propertySchema.propertyId]}`}
                            >
                                <div className='cursor-pointer relative min-w-[250px] min-h-[286px] rounded-[16px] border border-[#EEEDED] p-1.5 pb-4 flex flex-col gap-2.5'>
                                    <div >
                                        <img src={item[propertySchema.media][mediaSchema.images][randomImageGetter]}
                                            className='object-cover rounded-[10px] w-full min-w-[238px] h-[120px]'
                                        />
                                    </div>

                                    <div className='flex flex-col gap-2.5 px-1.5'>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-[14px] custom-semibold'>{item[propertySchema.propertyName]}</p>
                                            <p className='custom-semibold text-[14px]'>{item[propertySchema.rent][rentSchema.minRange]}<span className='custom-light text-[10px]'>/Mo</span></p>
                                        </div>
                                        <p className='text-[#838383] text-[12px] custom-poppins'>Listed on: {item[propertySchema.listedOn].split(",")[0]}</p>

                                        <div className="whitespace-nowrap ">
                                            <span className="inline-flex gap-2.5 pr-2.5">
                                                {Object.values((item[propertySchema.rent][rentSchema.roomTypes])).map((rooms, key) => (
                                                    <p key={key} className='bg-[#FFECDE] rounded-[20px] py-0.5 px-1.5 custom-poppins text-[10px] text-[#FF6A00]'>{rooms[roomTypesSchema.type]}</p>
                                                ))}
                                            </span>

                                        </div>
                                        <div className="flex w-full items-center min-w-[158px] h-[18px] gap-[5px] ">
                                            <Address className="w-[18px] h-[18px] text-[#838383]" />
                                            <div className=" w-full overflow-hidden">
                                                <p className="text-[#838383] text-[12px] custom-poppins whitespace-nowrap ">
                                                    {item[propertySchema.locationDetails][locationDetailsSchema.locality]},
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
            )}
        </>

    )
}

export default Properties