import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from '../call_handler/supabase-client'

export const PropertiesContext = createContext();

export const PropertiesContextProvider = ({ children }) => {
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [loader, setLoader] = useState(false)
    const location = useLocation()
    const [popup, setPopup] = useState({
        type: null,
        isOpen: false
    })
    const [propertyFilterIsOpen, setPropertyFilterIsOpen] = useState(false)


    const openPopup = (type) => {
        setPopup({ type, isOpen: true })
    }
    const closePopup = () => {
        setPopup({ type: null, isOpen: false })
    }


    useEffect(() => {

        const getData = async () => {

            setLoader(true)

            const { data: propertiesData, error: propertiesError } = await supabase
                .from('Properties')
                .select('title, created_at,id, images, Rent(room_types), Location(locality, city)')

            if (propertiesData) {

                const updated = propertiesData.map(item => {
                    const roomTypes = item.Rent?.[0]?.room_types || [];
                    const lowestPrice = roomTypes.length
                        ? Math.min(...roomTypes.map(r => Number(r.price)))
                        : null;

                    return {
                        ...item,
                        lowestPrice
                    };
                });

                setProperties(updated);
                setLoader(false)
            }
            else {
                console.log(propertiesError);
                setLoader(false)

            }
        };

        getData();
        closePopup();
        setPropertyFilterIsOpen(false);
       

    }, [location]);


    return (
        <PropertiesContext.Provider value={{
            properties,
            setProperties,
            openPopup,
            closePopup,
            popup,
            setPopup,
            setPropertyFilterIsOpen,
            propertyFilterIsOpen,
            filteredProperties,
            setFilteredProperties,
            loader
        }}>
            {children}
        </PropertiesContext.Provider>
    )
}

export const useProperties = () => {
    return useContext(PropertiesContext)
}

export default useProperties;
