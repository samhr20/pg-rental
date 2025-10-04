import BookingTrend from "../components/BookingTrend"
import DashboardGrid from "../components/DashboardGrid"
import ComplaintCategory from '../components/ComplaintCategory'
import PartnerPayout from '../components/PartnerPayout'
import RevenueGrowth from '../components/RevenueGrowth'
import PropertyVerification from "../components/PropertyVerification"

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-[20px] lg:h-[660px] overflow-x-hidden lg:overflow-y-scroll ">
      <div className='w-[542px] h-[54px] space-y-[6px] space-x-[6px]'>
        <p className='text-[20px] text-[#000000] leading-[100%] tracking-[0%]'>Reports & Analytics</p>
        <p className='text-[12px] text-[#838383] leading-[100%] tracking-[0%]'>Monitor platform performance, trends, and detailed statistics to improve decision-making.</p>
      </div>

      <DashboardGrid />
      <div className="w-[1100px] h-[270px] lg:flex lg:justify-between lg:items-center gap-5 space-y-5 lg:space-y-0  ">
        <BookingTrend />
        <ComplaintCategory />
        <PartnerPayout />
      </div>
      <div className="w-[1100px] h-[270px] lg:flex lg:justify-between lg:items-center gap-5 space-y-5 lg:space-y-0  ">
        <PropertyVerification />
        <RevenueGrowth />
      </div>

    </div>

  )
}

export default Dashboard