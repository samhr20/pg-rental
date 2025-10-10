import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataFetchContext = createContext();

export const DataFetchProvider = ({ children }) => {

    const [gridData, setGridData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [complaintCategory, setComplaintCategory] = useState([]);
    const [partnerPayout, setPartnerPayout] = useState([]);
    const [propertyVerification, setPropertyVerification] = useState([]);
    const [revenueGrowth, setRevenueGrowth] = useState([]);
    const [adminData, setAdminData] = useState([])
    const [allRoles, setAllRoles] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const grid = await axios.get('http://localhost:3000/DashboardGridData');
                const booking = await axios.get('http://localhost:3000/BookingTrendData');
                const complaint = await axios.get('http://localhost:3000/ComplaintCategoryData');
                const payout = await axios.get('http://localhost:3000/PartnerPayoutData');
                const property = await axios.get('http://localhost:3000/PropertyVerificationData');
                const revenue = await axios.get('http://localhost:3000/RevenueGrowthData');
                const adminData = await axios.get('http://localhost:3000/AdminData')
                 const roles = await axios.get('http://localhost:3000/Roles')

                setGridData(grid.data);
                setBookingData(booking.data);
                setComplaintCategory(complaint.data);
                setPartnerPayout(payout.data);
                setPropertyVerification(property.data);
                setRevenueGrowth(revenue.data);
                setAdminData(adminData.data)
                setAllRoles(roles.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);




    return (
        <DataFetchContext.Provider value={{
            gridData,
            bookingData,
            complaintCategory,
            partnerPayout,
            propertyVerification,
            revenueGrowth,
            adminData,
            setAdminData,
            allRoles,
            setAllRoles
        }}>
            {children}
        </DataFetchContext.Provider>
    )
}

const useData = () => {
    return useContext(DataFetchContext)
}

export default useData 