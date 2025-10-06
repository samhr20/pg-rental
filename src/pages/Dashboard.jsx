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

      <div className="hidden w-full size1280:grid grid-cols-1 xl:grid-cols-8 gap-5">
        <div className="col-span-4">
          <BookingTrend />
        </div>
        <div className="col-span-2">
          <ComplaintCategory />
        </div>
        <div className="col-span-2">
          <PartnerPayout />
        </div>
      </div>

      <div className=" hidden w-full size1280:grid grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="col-span-1">
          <PropertyVerification />
        </div>
        <div className="col-span-3">
          <RevenueGrowth />
        </div>
      </div>

      <div className="size1280:hidden hidden size1000:block ">
        <div className="flex flex-col">
          <div>
            <BookingTrend />
          </div>

          <div className="grid grid-cols-1 size1000:grid-cols-4 gap-5">
            <div className="col-span-1">
              <ComplaintCategory />
            </div>
            <div className="col-span-2">
              <PartnerPayout />
            </div>
            <div className="col-span-1">
              <PropertyVerification />
            </div>
          </div>
          <div>
            <RevenueGrowth />
          </div>
        </div>

      </div>

      <div className="size1000:hidden ">
        <div className="flex flex-col">
          <div>
            <BookingTrend />
          </div>

          <div className="grid grid-cols-1 size750:grid-cols-2 gap-5">
            <div className="col-span-1">
              <ComplaintCategory />
            </div>
            <div className="col-span-1">
              <PropertyVerification />
            </div>
          </div>
          <div>
            <div className="col-span-2">
              <PartnerPayout />
            </div>
          </div>
          <div>
            <RevenueGrowth />
          </div>
        </div>

      </div>



    </div>

  )
}

export default Dashboard