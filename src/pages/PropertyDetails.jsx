import React from 'react'
import { useParams } from 'react-router-dom'
import useProperties from '../context/PropertiesContext'
import { bookingHistorySchema, engagementMetricsSchema, locationDetailsSchema, partnerInfoSchema, photosAndMediaSchema, propertySchema, propertyTypeStructureSchema } from '../helpers/properties_enum'
import Block from '../../public/svg/Block.svg?react'
import Unblock from '../../public/svg/Unblock.svg?react'
import Check from '../../public/svg/Check.svg?react'
import Delete from '../../public/svg/Delete.svg?react'
import ActionButton from '../components/ActionButton'
import DetailCard from '../components/DetailCard'
import DetailRow from '../components/DetailRow'

const PropertyDetails = () => {
    const { propertyId } = useParams()
    const { properties } = useProperties()

    if (properties.length === 0) {
        return (
            <div className='flex items-center justify-center p-[30px] h-full bg-white rounded-[20px]'>
                <p className='text-xl text-gray-500'>Loading...</p>
            </div>
        );
    }

    const formatLabel = (text) => {
        return text
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
    };

    const thisProperty = properties.find((Property) => Property[propertySchema.propertyId] === propertyId)
    const rooms = thisProperty[propertySchema.propertyTypeStructure][propertyTypeStructureSchema.roomsAvailable].join(", ")
    const accountStatus = thisProperty[propertySchema.partnerInfo][partnerInfoSchema.accountStatus]
    const accountStatusColor = accountStatus === "Verified" ? "#00B806" : accountStatus === "Pending Verification" ? "#FF0000" : accountStatus === "Suspended" ? "#FF0000" : "#00000"


    return (
        <div className='flex flex-col gap-4 p-[30px] pb-[10px] h-full bg-white rounded-[20px]'>
            <div className='flex  justify-between items-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className=' min-w-[307px] flex items-center justify-between gap-5'>
                        <p className='custom-poppins text-[24px] '>{thisProperty[propertySchema.propertyName]}</p>
                        <p className='-mt-2.5 bg-[#00B8061A] min-w-[51px] min-h-[23px] rounded-[20px] py-0.5 px-2.5 flex  justify-center items-center gap-2.5 text-[10px] text-[#00B806]'>
                            {thisProperty[propertySchema.active] ? "Active" : "Inactive"}
                        </p>
                    </div>
                    <div className='flex items-center  w-full gap-4 text-[#838383] text-[14px]'>
                        <p>#{thisProperty[propertySchema.propertyId]}</p>
                        <p>|</p>
                        <p>{thisProperty[propertySchema.listedOn]}</p>
                    </div>
                </div>
                <div className='h-full flex items-end justify-between '>
                    <div className='flex items-center justify-between cursor-pointer gap-4'>
                        {/* Show Block button only if the property is active */}
                        {thisProperty[propertySchema.active] && (
                            <ActionButton IconComponent={Block} text={"Block"} bgColor={"#FF000014"} iconColor={"#FF0000"} />
                        )}

                        {/* Show Unblock button only if the property is NOT active */}
                        {!thisProperty[propertySchema.active] && (
                            <ActionButton IconComponent={Unblock} text={"Unblock"} bgColor={"#0022FF14"} iconColor={"#0022FF"} />
                        )}

                        {/* Show Verify button only if account status is "Pending Verification" */}
                        {accountStatus === "Pending Verification" && (
                            <ActionButton IconComponent={Check} text={"Verify"} bgColor={"#00B80614"} iconColor={"#00B806"} />
                        )}

                        {/* Show Delete button only if the property is NOT active for safety */}
                        {!thisProperty[propertySchema.active] && (
                            <ActionButton IconComponent={Delete} text={"Delete"} bgColor={"#FF000014"} iconColor={"#FF0000"} />
                        )}
                    </div>
                </div>
            </div>
            <hr className='border border-[#EEEDED]' />
            <div className='overflow-y-scroll flex flex-col gap-4'>
                <div className='min-w-[1060px] flex justify-between items-start gap-4'>
                    <div className='flex flex-col gap-4 w-full '>
                        <DetailCard title={"Location Details"}>
                            <DetailRow label={"City"} value={thisProperty[propertySchema.locationDetails][locationDetailsSchema.city]} />
                            <DetailRow label={"Full Address"} value={thisProperty[propertySchema.locationDetails][locationDetailsSchema.address]} multiline />
                        </DetailCard>
                        <DetailCard title={"Property Type & Structure"}>
                            <DetailRow label={"Type"} value={thisProperty[propertySchema.propertyTypeStructure][propertyTypeStructureSchema.type]} />
                            <DetailRow label={"Rooms Availability"} value={rooms} multiline />
                            <DetailRow label={"Gender Preference"} value={thisProperty[propertySchema.propertyTypeStructure][propertyTypeStructureSchema.genderPreference]} />
                            <DetailRow label={"Furnishing"} value={thisProperty[propertySchema.propertyTypeStructure][propertyTypeStructureSchema.furnishing]} />
                        </DetailCard>
                        <DetailCard title={"Amenities"} >
                            <div className=" w-[302px] flex flex-wrap items-center  gap-x-[30px] gap-y-3">
                                {Object.entries(thisProperty[propertySchema.amenities]).map(([key, value]) => (
                                    value && (
                                        <div key={key} className="flex items-center gap-1.5">
                                            <div className="flex items-center justify-center w-[24px] h-[24px] rounded-[16px] py-[1.6px] px-[4.8px] bg-[#00B80633]">
                                                <Check className="w-[14px] h-[14px] text-black" />
                                            </div>
                                            <p className="text-[12px] custom-poppins capitalize">{key}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </DetailCard>
                    </div>
                    <div className='flex flex-col gap-4 w-full '>
                        <DetailCard title={"Partner (Owner) Info"}>
                            <DetailRow label={"Name"} value={thisProperty[propertySchema.partnerInfo][partnerInfoSchema.name]} />
                            <DetailRow label={"Phone Number"} value={thisProperty[propertySchema.partnerInfo][partnerInfoSchema.phone]} />
                            <DetailRow label={"Email"} value={thisProperty[propertySchema.partnerInfo][partnerInfoSchema.email]} />
                            <DetailRow label={"Account Status"} value={thisProperty[propertySchema.partnerInfo][partnerInfoSchema.accountStatus]} textColor={accountStatusColor} />
                        </DetailCard>
                        <DetailCard title={"Rent & Price"}>
                            {Object.entries(thisProperty[propertySchema.rentAndPrice]).map(([key, value]) => (
                                <DetailRow label={formatLabel(key)} value={value} />
                            ))}
                        </DetailCard>
                        <DetailCard title={"Engagement Metrics"}>
                            <DetailRow label={"Total Views"} value={thisProperty[propertySchema.engagementMetrics][engagementMetricsSchema.totalViews]} />
                            <DetailRow label={"Total Inquiries"} value={thisProperty[propertySchema.engagementMetrics][engagementMetricsSchema.totalInquiries]} />
                            <DetailRow label={"Last Booking"} value={thisProperty[propertySchema.engagementMetrics][engagementMetricsSchema.lastBooking]} />
                        </DetailCard>

                    </div>
                    <div className='flex flex-col gap-4 w-full '>
                        <DetailCard title={"Photos / Media"}>
                            <p className='text-[#838383] text-[12px] custom-poppins'>Walkthrough Video</p>
                            <img
                                className='h-[100px] w-[200px] rounded-[10px]'
                                src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.walkthroughVideo]}
                            />
                            <p className='text-[#838383] text-[12px] custom-poppins'>Property Front & Surrounding</p>
                            <div className='flex gap-4 items-center min-w-[176px]'>
                                <img
                                    className='h-[80px] w-[80px] rounded-[10px]'
                                    src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.images][0]}
                                />
                                <img
                                    className='h-[80px] w-[80px] rounded-[10px]'
                                    src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.images][1]}
                                />
                            </div>
                            <p className='text-[#838383] text-[12px] custom-poppins'>Double Sharing</p>
                            <div className='flex gap-4 items-center min-w-[176px]'>
                                <img
                                    className='h-[80px] w-[80px] rounded-[10px]'
                                    src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.images][2]}
                                />
                                <img
                                    className='h-[80px] w-[80px] rounded-[10px]'
                                    src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.images][3]}
                                />
                                <img
                                    className='h-[80px] w-[80px] rounded-[10px]'
                                    src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.images][4]}
                                />
                            </div>
                            <p className='text-[#838383] text-[12px] custom-poppins'>Private Room</p>
                            <div className='flex gap-4 items-center min-w-[176px]'>
                                <img
                                    className='h-[80px] w-[80px] rounded-[10px]'
                                    src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.images][2]}
                                />
                                <img
                                    className='h-[80px] w-[80px] rounded-[10px]'
                                    src={thisProperty[propertySchema.photosAndMedia][photosAndMediaSchema.images][4]}
                                />
                            </div>
                        </DetailCard>
                    </div>
                </div>
                <hr className='border border-[#EEEDED]' />
                <div className='flex flex-col gap-4 w-full'>
                    <p className='custom-medium text-[14px] text-[#FF6A00]'>Booking History</p>
                    {thisProperty[propertySchema.bookingHistory].length > 0 ? (
                        <div className="border border-[#EEEDED] rounded-[20px] overflow-hidden">
                            <div className="overflow-y-auto max-h-[345px]">
                                <table className="w-full custom-poppins border-collapse">
                                    <thead className="bg-[#FFECDE] sticky top-0 z-10">
                                        <tr className="h-[46px] text-left text-black text-[12px]">
                                            <th className="p-2.5 pl-6 font-normal">Date</th>
                                            <th className="p-2.5 font-normal">Booking ID</th>
                                            <th className="p-2.5 font-normal">Tenant Name</th>
                                            <th className="p-2.5 font-normal">Room Type</th>
                                            <th className="p-2.5 font-normal">Check-In</th>
                                            <th className="p-2.5 font-normal">Status</th>
                                            <th className="p-2.5 font-normal">Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white">
                                        {Object.values(thisProperty[propertySchema.bookingHistory]).map((item, key) => (
                                            <tr key={key} className="h-[38px] border-[#EDEDED] text-black">
                                                <td className="text-[12px] p-2.5 pl-6">
                                                    {item[bookingHistorySchema.date]}
                                                </td>

                                                <td className="text-[12px] p-2.5">
                                                    {item[bookingHistorySchema.bookingId]}
                                                </td>

                                                <td className="text-[12px] p-2.5">
                                                    {item[bookingHistorySchema.tenantName]}
                                                </td>

                                                <td className="text-[12px] p-2.5">
                                                    {item[bookingHistorySchema.roomType]}
                                                </td>

                                                <td className="text-[12px] p-2.5">
                                                    {item[bookingHistorySchema.checkIn]}
                                                </td>

                                                <td className="text-[12px] p-2.5">
                                                    {item[bookingHistorySchema.status]}
                                                </td>

                                                <td className="text-[12px] p-2.5">
                                                    {item[bookingHistorySchema.amount]}
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center'>
                            <p>No Booking History</p>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails