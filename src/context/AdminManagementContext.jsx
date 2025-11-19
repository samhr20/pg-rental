import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from '../call_handler/supabase-client'
import { AdminData } from '../db/db.json'

export const AdminManagementContext = createContext();

export const AdminManagementContextProvider = ({ children }) => {
    const [newAdminOpen, setNewAdminOpen] = useState(false);
    const [adminData, setAdminData] = useState([])
    const [allRoles, setAllRoles] = useState([])
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {


            const adminData = supabase.from('Admin Management').select('*')
            const { data, error } = await adminData;

            if (data) {
                setAdminData(data)
            } else {
                console.error(error);

            }


            try {
                const roles = await axios.get('http://localhost:3000/Roles')

                setAllRoles(roles.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (location.pathname === "/admin-management") {
            fetchData();
        }

    }, [location.pathname]);


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
                adminData,
                setAdminData,
                allRoles,
                setAllRoles
            }}
        >
            {children}
        </AdminManagementContext.Provider>
    );
};

const useAdminManagement = () => useContext(AdminManagementContext);

export default useAdminManagement;
