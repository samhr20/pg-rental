import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const AddNewAdminContext = createContext();

export const AddNewAdminContextProvider = ({ children }) => {
    const [newAdminOpen, setNewAdminOpen] = useState(false)
    const location = useLocation();

    const adminToggle = () => {
        setNewAdminOpen(newAdminOpen => !newAdminOpen)
    }

    useEffect(() => {
        setNewAdminOpen(false)
    }, [location])
    

    return (
        <AddNewAdminContext.Provider value={{ newAdminOpen , adminToggle }}>
            {children}
        </AddNewAdminContext.Provider>
    )
}

const useNewAdmin = () => {
    return useContext(AddNewAdminContext);
}

export default useNewAdmin