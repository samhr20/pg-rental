import React from 'react'
import useProperties from '../context/PropertiesContext'

const PropertyFilters = () => {
    const { propertyFilterIsOpen , setPropertyFilterIsOpen} = useProperties();
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-200 ${propertyFilterIsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={()=>setPropertyFilterIsOpen(false)}
            />


            {/* Right Drawer */}
            <div
                className={`fixed top-0 right-0 z-60 w-[370px] h-full rounded-tl-[30px] rounded-bl-[30px] px-[20px] pt-[20px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col gap-[20px] ${propertyFilterIsOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <p className="text-[16px] custom-semibold  text-[#FF6A00]">Filter Bookings</p>
                <div className='flex flex-col gap-[10px] bg-[#F9F9F9]'>
                    
                </div>
            </div>
        </>
    )
}

export default PropertyFilters