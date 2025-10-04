import BookingTrend from "../components/BookingTrend"
import DashboardGrid from "../components/DashboardGrid"
import ComplaintCategory from '../components/ComplaintCategory'
import PartnerPayout from '../components/PartnerPayout'
import RevenueGrowth from '../components/RevenueGrowth'
import PropertyVerification from "../components/PropertyVerification"

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-[20px] min-h-screen overflow-x-hidden">
      <div className='w-full max-w-4xl space-y-[6px]'>
        <p className='text-[20px] text-[#000000] leading-[100%] tracking-[0%]'>Reports & Analytics</p>
        <p className='text-[12px] text-[#838383] leading-[100%] tracking-[0%]'>Monitor platform performance, trends, and detailed statistics to improve decision-making.</p>
      </div>

      <DashboardGrid />

      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5">
        <BookingTrend />
        <ComplaintCategory />
        <PartnerPayout />
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5">
        <PropertyVerification />
        <RevenueGrowth />
      </div>

    </div>

  )
}

export default Dashboard