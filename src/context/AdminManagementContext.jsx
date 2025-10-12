import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AdminManagementContext = createContext();

export const AdminManagementContextProvider = ({ children }) => {
    const [newAdminOpen, setNewAdminOpen] = useState(false);
    const [adminData, setAdminData] = useState([])
    const [allRoles, setAllRoles] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const adminData = await axios.get('http://localhost:3000/AdminData')
                const roles = await axios.get('http://localhost:3000/Roles')

                setAdminData(adminData.data)
                setAllRoles(roles.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const location = useLocation();

    const adminToggle = () => {
        setNewAdminOpen((prev) => !prev);
    };

    useEffect(() => {
        setNewAdminOpen(false);
    }, [location]);

    return (
        <AdminManagementContext.Provider
            value={{
                newAdminOpen,
                adminToggle,
               adminData , 
               setAdminData ,
               allRoles , 
               setAllRoles
            }}
        >
            {children}
        </AdminManagementContext.Provider>
    );
};

const useAdminManagement = () => useContext(AdminManagementContext);

export default useAdminManagement;
