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
    { icon: AdminIcon, text: 'Dashboard' },
    { icon: AdminIcon, text: 'Admin Management' },
    { icon: PropertyIcon, text: 'Properties' },
    { icon: BookingIcon, text: 'Bookings' },
    { icon: PartnerIcon, text: 'Partner' },
    { icon: TenantIcon, text: 'Tenants' },
    { icon: PaymentsIcon, text: 'Transaction & Payouts' },
    { icon: ComplaintIcon, text: 'Complaints' },
    { icon: ReportIcon, text: 'Promotion & Ads' },
    { icon: ReportIcon, text: 'Membership & Plan' },
    { icon: ChatsIcon, text: 'Message/Notification' },
    { icon: SettingIcon, text: 'Setting & Confirguation' },
    { icon: LogoutIcon, text: 'Logout' },

  ];


  return (
    <div className='bg-white w-[270px] h-[770px] rounded-[20px] pt-10 px-3.5 pb-3.5'>
      <h1 className='text-[45.47px] text-[#FF6A00]'>Aashiyana</h1>
      <div className="w-[242px] h-[644px]">

        {NavigationButton.map((Item, key) => {
          return <span key={key} className=' group flex items-center justify-between cursor-pointer hover:bg-[#FF6A00] p-[10px] rounded-[10px] hover:text-white'>

            <Item.icon className='h-[18px] w-[18px] fill-current  group-hover:fill-white' />
            <p className='text-start text-[15px]' >{Item.text}</p>
            <ArrowIcon className="h-[15px] w-[10px] " />
          </span>

        })}



      </div>
    </div>
  )
}

export default leftBar