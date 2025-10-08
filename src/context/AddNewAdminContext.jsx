import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AddNewAdminContext = createContext();

export const AddNewAdminContextProvider = ({ children }) => {
    const [newAdminOpen, setNewAdminOpen] = useState(false);
    const [allAdminDetails, setAllAdminDetails] = useState([]);

    const location = useLocation();

    const adminToggle = () => {
        setNewAdminOpen((prev) => !prev);
    };

    useEffect(() => {
        const storedAdmins = localStorage.getItem("allAdminDetails");
        if (storedAdmins) {
            setAllAdminDetails(JSON.parse(storedAdmins));
        }
    }, []);

    useEffect(() => {
        if (allAdminDetails.length > 0) {
            localStorage.setItem("allAdminDetails", JSON.stringify(allAdminDetails));
        }
    }, [allAdminDetails]);

    useEffect(() => {
        setNewAdminOpen(false);
    }, [location]);

    return (
        <AddNewAdminContext.Provider
            value={{
                newAdminOpen,
                adminToggle,
                allAdminDetails,
                setAllAdminDetails,
            }}
        >
            {children}
        </AddNewAdminContext.Provider>
    );
};

const useNewAdmin = () => useContext(AddNewAdminContext);

export default useNewAdmin;
