import { useLocation } from 'react-router-dom'
import Search from '../../public/svg/Search.svg?react'
import Notification from '../../public/svg/Notification.svg?react'
import Setting from '../../public/svg/Setting.svg?react'
import Menu from '../../public/svg/Menu.svg?react'
import { Link } from 'react-router-dom'
import useSideBar from '../context/SideBarContext'
const titles = {
  '/admin-management': 'Admin Management',
  '/properties': 'Properties',
  '/bookings': 'Bookings',
  '/partner': 'Partner',
  '/tenants': 'Tenants',
  '/transaction': 'Transaction & Payouts',
  '/complaints': 'Complaints',
  '/promotion': 'Promotion & Ads',
  '/plan': 'Membership & Plan',
  '/notification': 'Message/Notification',
  '/setting': 'Setting & Confirguation',
  '/logout': 'Logout'
}

const Navbar = () => {
  const { pathname } = useLocation()
  const title = titles[pathname] || 'Dashboard'

  const { menuToggle } = useSideBar()

  return (
    <div className='flex justify-between items-center rounded-[20px] w-full bg-white py-[10px] lg:px-[30px] px-[10px]'>
      <p className='text-[#FF6A00] leading-[100%] tracking-[0%] text-[16px]'>{title}</p>
      <div className='flex justify-between w-20 lg:w-[132px] h-[24px] gap-[30px]'>
        <Search className="cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-5 " />
        <Link to="/notification">
          <Notification className="cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-6 " />
        </Link>
        <Link to="/setting">
          <Setting className="cursor-pointer hidden lg:block hover:text-orange-400 transition-colors duration-200 h-6 w-6" />
        </Link>
        <Menu onClick={menuToggle} className="cursor-pointer lg:hidden hover:text-orange-400 transition-colors duration-200 h-6 w-6" />

      </div>
    </div>
  )
}

export default Navbar