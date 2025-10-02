import { useLocation } from 'react-router-dom'
import Search from '../../public/svg/Search.svg?react'
import Notification from '../../public/svg/Notification.svg?react'
import Setting from '../../public/svg/Setting.svg?react'

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
    <div className='flex justify-between items-center rounded-[20px] bg-white py-[10px] px-[30px] border border-gray-400 shadow'>
      <h2 className='text-[#FF6A00] text-[18px]'>{title}</h2>
      <div className='flex justify-between  w-40'>
        <Search className="cursor-pointer hover:text-orange-400 transition-colors duration-200" />
        <Notification className="cursor-pointer hover:text-orange-400 transition-colors duration-200" />
        <Setting className="cursor-pointer hover:text-orange-400 transition-colors duration-200" />
      </div>
    </div>
  )
}

export default Navbar