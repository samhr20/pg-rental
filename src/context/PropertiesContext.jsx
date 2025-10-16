import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const PropertiesContext = createContext();

export const PropertiesContextProvider = ({ children }) => {
    const [properties, setProperties] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
               const properties = await axios.get("http://localhost:3000/Properties");
                setProperties(properties.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);


    return (
        <PropertiesContext.Provider value={{
            properties,
            setProperties
        }}>
            {children}
        </PropertiesContext.Provider>
    )
}

export const useProperties = () => {
    return useContext(PropertiesContext)
}

export default useProperties;
