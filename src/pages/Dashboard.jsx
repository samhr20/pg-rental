import BookingTrend from "../components/BookingTrend"
import DashboardGrid from "../components/DashboardGrid"
import ComplaintCategory from '../components/ComplaintCategory'
import PartnerPayout from '../components/PartnerPayout'
import RevenueGrowth from '../components/RevenueGrowth'
import PropertyVerification from "../components/PropertyVerification"

const Dashboard = () => {
  return (
    <div className="lg:h-[650px] overflow-x-hidden lg:overflow-y-scroll">
      <div className='mt-5'>
        <h3 className='text-[24px]'>Reports & Analytics</h3>
        <p className='text-[12px] text-[#838383]'>Monitor platform performance, trends, and detailed statistics to improve decision-making.</p>
      </div>

      <DashboardGrid />
      <div className="mt-4 lg:flex lg:justify-between lg:items-center gap-5 space-y-5 lg:space-y-0  ">
        <BookingTrend />
        <ComplaintCategory />
        <PartnerPayout />
      </div>
      <div className="mt-4 lg:flex lg:justify-between lg:items-center gap-5 space-y-5 lg:space-y-0  ">
        <PropertyVerification />
        <RevenueGrowth />
      </div>

    </div>

  )
}

export default Dashboard