import { useLocation } from 'react-router-dom'
import Search from '../../public/svg/Search.svg?react'
import Notification from '../../public/svg/Notification.svg?react'
import Setting from '../../public/svg/Setting.svg?react'
import Menu from '../../public/svg/Menu.svg?react'
import { Link } from 'react-router-dom'
import useSideBar from '../context/SideBarContext'
const titles = {
  '/admin-management': 'Admin Management',
  '/admin-management/manage-roles': 'Manage Roles & Permissions',
  '/admin-management/add-new-role': 'Add New Role',
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
    <div className='flex justify-between items-center rounded-[20px] w-full bg-white py-[10px] size1000:px-[30px] px-[10px]'>
      <p className='text-[#FF6A00] leading-[100%] tracking-[0%] text-[16px]'>{title}</p>
      <div className='flex justify-between w-[132px] h-6 gap-[30px]'>
        <Search className='cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-5' />
        <Notification className='cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-5' />
        <Setting className='hidden size1000:block cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-5' />
        <Menu onClick={menuToggle} className='size1000:hidden  cursor-pointer hover:text-orange-400 transition-colors duration-200 h-6 w-5' />

      </div>
    </div>
  )
}

export default Navbar