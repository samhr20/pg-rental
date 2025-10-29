import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {

    const [gridData, setGridData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [complaintCategory, setComplaintCategory] = useState([]);
    const [partnerPayout, setPartnerPayout] = useState([]);
    const [propertyVerification, setPropertyVerification] = useState([]);
    const [revenueGrowth, setRevenueGrowth] = useState([]);
   const location =  useLocation()
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const grid = await axios.get('http://localhost:3000/DashboardGridData');
                const booking = await axios.get('http://localhost:3000/BookingTrendData');
                const complaint = await axios.get('http://localhost:3000/ComplaintCategoryData');
                const payout = await axios.get('http://localhost:3000/PartnerPayoutData');
                const property = await axios.get('http://localhost:3000/PropertyVerificationData');
                const revenue = await axios.get('http://localhost:3000/RevenueGrowthData');

                
                setGridData(grid.data);
                setBookingData(booking.data);
                setComplaintCategory(complaint.data);
                setPartnerPayout(payout.data);
                setPropertyVerification(property.data);
                setRevenueGrowth(revenue.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
       if (location.pathname === "/") {
           fetchData();
       }

    }, [location.pathname]);




    return (
        <DashboardContext.Provider value={{
            gridData,
            bookingData,
            complaintCategory,
            partnerPayout,
            propertyVerification,
            revenueGrowth,
        }}>
            {children}
        </DashboardContext.Provider>
    )
}

const useDashboard = () => {
    return useContext(DashboardContext)
}

export default useDashboard 