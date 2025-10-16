import React from 'react'
import { useParams } from 'react-router-dom'
import useProperties from '../context/PropertiesContext'
import { propertySchema } from '../helpers/properties_enum'

const PropertyDetails = () => {
    const { propertyId } = useParams()
    const { properties } = useProperties()

    if (properties.length === 0) {
        return (
            <div className='flex items-center justify-center p-[30px] h-full bg-white rounded-[20px]'>
                <p className='text-xl text-gray-500'>Loading...</p>
            </div>
        );
    }

    const thisProperty = properties.find((Property) => Property[propertySchema.propertyId] === propertyId)

    return (
        <div className='flex items-center justify-center p-[30px] h-full bg-white rounded-[20px]'>
        
        </div>
    )
}

export default PropertyDetails