import BookingTrend from "./BookingTrend"
import DashboardGrid from "./DashboardGrid"
import ComplaintCategory from './ComplaintCategory'
import PartnerPayout from './PartnerPayout'
import RevenueGrowth from './RevenueGrowth'
import PropertyVerification from "./PropertyVerification"
const Dashboard = () => {
  return (
    <div className="h-[650px] overflow-x-hidden overflow-y-scroll">
      <div className='mt-5'>
        <h3 className='text-[24px]'>Reports & Analytics</h3>
        <p className='text-[12px] text-[#838383]'>Monitor platform performance, trends, and detailed statistics to improve decision-making.</p>
      </div>

      <DashboardGrid />
      <div className="mt-4 flex justify-between items-center ">
        <BookingTrend />
        <ComplaintCategory />
        <PartnerPayout />
      </div>
      <div className="mt-4 flex justify-between items-center ">
       <PropertyVerification/>
       <RevenueGrowth/>
      </div>

    </div>

  )
}

export default Dashboard