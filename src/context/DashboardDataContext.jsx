import { createContext, useContext, useState } from "react";
import DashboardGridData from '../local_database/DashboardGridData.json'
import BookingTrendData from '../local_database/BookingTrendData.json'
import ComplaintCategoryData from '../local_database/ComplaintCategoryData.json'
import PartnerPayoutData from "../local_database/PartnerPayoutData.json";
import PropertyVerificationData from "../local_database/PropertyVerificationData.json";
import RevenueGrowthData from '../local_database/RevenueGrowthData.json'

export const DashboardDataContext = createContext();

export const DashboardDataProvider = ({ children }) => {
    const [gridData, setGridData] = useState(DashboardGridData);
    const [bookingData, setBookingData] = useState(BookingTrendData);
    const [complaintCategory, setComplaintCategory] = useState(ComplaintCategoryData);
    const [partnerPayout, setPartnerPayout] = useState(PartnerPayoutData);  
    const [propertyVerification, setPropertyVerification] = useState(PropertyVerificationData)
    const [revenueGrowth, setRevenueGrowth] = useState(RevenueGrowthData)

    return (
        <DashboardDataContext.Provider value={{ gridData, bookingData, complaintCategory, partnerPayout , propertyVerification , revenueGrowth }}>
            {children}
        </DashboardDataContext.Provider>
    )
}

const useData = () => {
    return useContext(DashboardDataContext)
}

export default useData 