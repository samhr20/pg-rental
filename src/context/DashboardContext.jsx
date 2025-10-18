import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {

    const [gridData, setGridData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [complaintCategory, setComplaintCategory] = useState([]);
    const [partnerPayout, setPartnerPayout] = useState([]);
    const [propertyVerification, setPropertyVerification] = useState([]);
    const [revenueGrowth, setRevenueGrowth] = useState([]);
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const grid = await axios.get('/DashboardGridData');
                const booking = await axios.get('/BookingTrendData');
                const complaint = await axios.get('/ComplaintCategoryData');
                const payout = await axios.get('/PartnerPayoutData');
                const property = await axios.get('/PropertyVerificationData');
                const revenue = await axios.get('/RevenueGrowthData');

                setGridData(grid.data);
                setBookingData(booking.data);
                setComplaintCategory(complaint.data);
                setPartnerPayout(payout.data);
                setPropertyVerification(property.data);
                setRevenueG
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);




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