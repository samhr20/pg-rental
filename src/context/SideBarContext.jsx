import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SideBarContext = createContext()

export const SideBarProvider = ({ children }) => {

    const [sideBarOpen, setSideBarOpen] = useState(false)
    const location = useLocation()

    const menuToggle = () => {
        setSideBarOpen(sideBarOpen => !sideBarOpen)
    }

    useEffect(() => {
        setSideBarOpen(false)
    }, [location])


    return (
        <SideBarContext.Provider value={{ menuToggle, sideBarOpen }}>
            {children}
        </SideBarContext.Provider>
    )
}


const useSideBar = () => {
    return useContext(SideBarContext)
}

export default useSideBar