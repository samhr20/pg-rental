import { NavLink, useLocation } from 'react-router-dom';
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
import useSideBar from '../context/SideBarContext';
import Cross from '../../public/svg/Cross.svg?react';
import styling, { applicationStyling } from '../components/RevenueGrowth';

const LeftBar = () => {
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

  const { sideBarOpen, menuToggle } = useSideBar();
  const location = useLocation()



  return (
    <>
      <div onClick={menuToggle}
        className={`fixed inset-0 bg-black/50 z-60 size1000:hidden transition-opacity duration-200 ${sideBarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} />

      <div className={` fixed top-0 left-0 z-60   w-[260px]  bg-white rounded-r-2xl size1000:rounded-[20px] shadow-lg pt-8 px-3.5 pb-3.5 gap-2.5
          transform transition-transform duration-200 ease-in-out flex flex-col h-full
          ${sideBarOpen ? 'translate-x-0' : '-translate-x-full'}
          size1000:static size1000:translate-x-0 size1000:shadow-none
        `}
      >

        <div className="flex justify-between items-center pr-2 pt-2 px-3.5 pb-3.5">
          <h1 className="text-[45.47px] text-[#FF6A00]">Aashiyana</h1>
          <Cross
            onClick={menuToggle}
            className="lg:hidden h-6 w-6 bg-black text-white p-1 rounded-full cursor-pointer"
          />
        </div>

        <div className="size1000:w-[232px] overflow-y-auto overflow-x-hidden size1000:h-[auto]">

          {NavigationButton.map((item, key) => (
            <div key={key}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>

                  `$group flex items-center justify-between cursor-pointer w-[232px] h-[32px] p-[10px] rounded-[10px] mb-2.5 gap-[14px] transition-colors duration-200 ${isActive ? 'bg-[#FF6A00] text-white active' : 'text-gray-700 hover:bg-[#ff6a0041]'}`
                }
              >
                <item.Icon
                  className="h-[18px] w-[18px] text-gray-600 transition-colors duration-200 
                           group-hover:text-black 
                           group-[.active]:text-white"
                />
                <p className="flex-1 text-start text-[12px] ">{item.text}</p>
                <ArrowIcon
                  className="h-[10px] w-[5px] text-[#EEEDED] transition-colors duration-200
                           group-hover:text-black
                           group-[.active]:text-white"
                />
              </NavLink>

              {item.path === "/admin-management" && (
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${location.pathname === "/admin-management" ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
                      `}
                >
                  <div className="bg-[#F9F9F9] py-4 pr-2 my-3 rounded-2xl space-y-2">
                    <span className="flex items-center justify-between cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
                      <p className="text-start text-[13px] mx-4">Add New Admin</p>
                      <ArrowIcon className="h-[12px] w-[10px] text-gray-400" />
                    </span>
                    <span className="flex items-center justify-between cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
                      <p className="text-start text-[13px] mx-4">Manage Role & Permission</p>
                      <ArrowIcon className="h-[12px] w-[10px] text-gray-400" />
                    </span>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftBar;
