import { useLocation } from 'react-router-dom'
import Search from '../../public/svg/Search.svg?react'
import Notification from '../../public/svg/Notification.svg?react'
import Setting from '../../public/svg/Setting.svg?react'
import Menu from '../../public/svg/Menu.svg?react'

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

  return (
    <div className='flex justify-between items-center rounded-[20px] bg-white py-[10px] lg:px-[30px] px-[10px] border border-gray-400 shadow'>
      <h2 className='text-[#FF6A00] lg:text-[18px] text-[16px]'>{title}</h2>
      <div className='flex justify-between w-20 lg:w-32'>
        <Search className="cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-5 " />
        <Notification className="cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-5 " />
        <Setting className="cursor-pointer hidden lg:block hover:text-orange-400 transition-colors duration-200 h-6 w-5 " />
        <Menu  className="cursor-pointer  lg:hidden   hover:text-orange-400 transition-colors duration-200 h-6 w-5" />

      </div>
    </div>
  )
}

export default Navbar