import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PropertiesContext = createContext();

export const PropertiesContextProvider = ({ children }) => {
    const [properties, setProperties] = useState([])
    const location = useLocation()
    const [popup, setPopup] = useState({
        type: null,
        isOpen: false
    })
    const [propertyFilterIsOpen, setPropertyFilterIsOpen] = useState(false)

    useEffect(() => {

       if (location.pathname === "/properties") {
            const fetchData = async () => {
            try {
                const properties = await axios.get("http://localhost:3000/Properties");
                setProperties(properties.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
       }

    }, [location.pathname]);

    const openPopup = (type) => {
        setPopup({ type, isOpen: true })
    }
    const closePopup = () => {
        setPopup({ type: null, isOpen: false })
    }


    useEffect(() => {
        closePopup()
        setPropertyFilterIsOpen(false)
    }, [location])


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
        }}>
            {children}
        </PropertiesContext.Provider>
    )
}

export const useProperties = () => {
    return useContext(PropertiesContext)
}

export default useProperties;
