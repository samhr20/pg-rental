import { NavLink } from 'react-router-dom';
import AdminIcon from '../../public/svg/Admin.svg?react';
import ArrowIcon from '../../public/svg/Arrow.svg?react';
import BookingIcon from '../../public/svg/Booking.svg?react';
import ChatsIcon from '../../public/svg/Chats.svg?react';
import ComplaintIcon from '../../public/svg/Complaint.svg?react';
import LogoutIcon from '../../public/svg/Logout.svg?react';
import PartnerIcon from '../../public/svg/Partner.svg?react';
import PaymentsIcon from '../../public/svg/Payments.svg?react';
import PropertyIcon from '../../public/svg/Property.svg?react';
import ReportIcon from '../../public/svg/Report.svg?react';
import SettingIcon from '../../public/svg/Setting.svg?react';
import TenantIcon from '../../public/svg/Tenant.svg?react';

const leftBar = () => {

  const NavigationButton = [
    { Icon: AdminIcon, text: 'Dashboard', path: '/' },
    { Icon: AdminIcon, text: 'Admin Management', path: '/admin-management' },
    { Icon: PropertyIcon, text: 'Properties', path: '/properties' },
    { Icon: BookingIcon, text: 'Bookings', path: '/bookings' },
    { Icon: PartnerIcon, text: 'Partner', path: '/partner' },
    { Icon: TenantIcon, text: 'Tenants', path: '/tenants' },
    { Icon: PaymentsIcon, text: 'Transaction & Payouts', path: '/transaction' },
    { Icon: ComplaintIcon, text: 'Complaints', path: '/complaints' },
    { Icon: ReportIcon, text: 'Promotion & Ads', path: '/promotion' },
    { Icon: ReportIcon, text: 'Membership & Plan', path: '/plan' },
    { Icon: ChatsIcon, text: 'Message/Notification', path: '/notification' },
    { Icon: SettingIcon, text: 'Setting & Confirguation', path: '/setting' },
    { Icon: LogoutIcon, text: 'Logout', path: '/logout' },

  ];


  return (
    <div className='hidden lg:block bg-white w-[270px]  rounded-[20px] pt-10 px-3.5 pb-3.5'>
      <h1 className='text-[41.47px] text-[#FF6A00]'>Aashiyana</h1>
      <div className="w-[242px] ">

        {NavigationButton.map((item, key) => (
          <NavLink
            key={key}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between cursor-pointer p-[10px] rounded-[10px] my-1 transition-colors duration-200 
              ${isActive ? 'bg-[#FF6A00] text-white active' : 'text-gray-700 hover:bg-[#ff6a0041]'
              }`
            }
          >
            <item.Icon
              className="h-[14px] w-[14px] text-gray-600 transition-colors duration-200 
                         group-hover:text-black 
                         group-[.active]:text-white"
            />

            <p className='flex-1 text-start text-[13px] mx-4'>
              {item.text}
            </p>

            <ArrowIcon
              className="h-[12px] w-[10px] text-gray-400 transition-colors duration-200
                         group-hover:text-black
                         group-[.active]:text-white"
            />
          </NavLink>
        ))}



      </div>
    </div>
  )
}

export default leftBar