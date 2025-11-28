import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useProperties from '../context/PropertiesContext'
import Block from '../../public/svg/Block.svg?react'
import Unblock from '../../public/svg/Unblock.svg?react'
import Check from '../../public/svg/Check.svg?react'
import Delete from '../../public/svg/Delete.svg?react'
import ActionButton from '../components/ActionButton'
import DetailCard from '../components/DetailCard'
import DetailRow from '../components/DetailRow'
import { supabase } from '../call_handler/supabase-client'
import { LocationSchema, partnerInfoSchema, PropertiesSchema, rentSchema, roomTypesSchema, statusControlsSchema } from '../helpers/properties_enum'


const PropertyDetails = () => {
    const location = useLocation()
    const { propertyId } = useParams()
    const { openPopup, thisProperty, setThisProperty } = useProperties()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const GetData = async () => {

            setLoader(true)
            const { data, error } = await supabase
                .from("Properties")
                .select(` *,Partner(*),StatusControls(*),Location(*),Rent(*),Amenties(*) `)
                .eq("id", propertyId)
                .single();

            if (error) {
                console.log(error);
                setLoader(false)
            } else {
                setThisProperty(data);
                setLoader(false)
                console.log(data);

            }
        };

        if (propertyId) {
            GetData();
        }
    }, [location === `/properties/${propertyId}`]);


    const accountStatus =
        thisProperty?.Partner?.[partnerInfoSchema.account_status]


    const accountStatusColor =
        accountStatus === 'Verified'
            ? '#00B806'
            : accountStatus === 'Pending Verification'
                ? '#FF0000'
                : accountStatus === 'Suspended'
                    ? '#FF0000'
                    : '#000000'


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };


    return (

        <>
            {loader ? (
                <div>Loading...</div>
            ) : !thisProperty ? (
                <div>Property Not Found</div>
            ) : (
                <div className='flex flex-col gap-4 p-[30px] pb-[10px] h-full bg-white rounded-[20px]'>
                    <div className='flex  justify-between items-center'>
                        <div className='flex flex-col gap-4'>
                            <div className=' max-w-[307px] flex items-center justify-between text-start gap-5'>
                                <p className='custom-poppins text-[24px] '>
                                    {thisProperty[PropertiesSchema.title]}
                                </p>
                                <p className='-mt-2.5 bg-[#00B8061A] min-w-[51px] min-h-[23px] rounded-[20px] py-0.5 px-2.5 flex  justify-center items-center gap-2.5 text-[10px] text-[#00B806]'>
                                    {thisProperty[PropertiesSchema.StatusControls]?.[0]?.[statusControlsSchema.active]
                                        ? 'Active'
                                        : 'Inactive'}
                                </p>
                            </div>

                            <div className='flex items-center  w-full gap-4 text-[#838383] text-[14px]'>
                                <p>#{thisProperty[PropertiesSchema.id]}</p>
                                <p>|</p>
                                <p>{formatDate(thisProperty[PropertiesSchema.created_at])}</p>

                            </div>
                        </div>

                        <div className='h-full flex items-end justify-between '>
                            <div className='flex items-center justify-between cursor-pointer gap-4'>



                                {thisProperty?.StatusControls?.[0]?.[statusControlsSchema.isBlocked] ? (

                                    <ActionButton
                                        IconComponent={Unblock}
                                        text={'Unblock'}
                                        bgColor={'#0022FF14'}
                                        iconColor={'#0022FF'}
                                        onClick={() => openPopup('unblock', propertyId)}
                                    />
                                ) : (

                                    <ActionButton
                                        IconComponent={Block}
                                        text={'Block'}
                                        bgColor={'#FF000014'}
                                        iconColor={'#FF0000'}
                                        onClick={() => openPopup('block', propertyId)}
                                    />
                                )}

                                {!thisProperty?.StatusControls?.[0]?.[statusControlsSchema.isVerified] && (
                                    <ActionButton
                                        IconComponent={Check}
                                        text={'Verify'}
                                        bgColor={'#00B80614'}
                                        iconColor={'#00B806'}
                                        onClick={() => openPopup('verify', propertyId)}
                                    />
                                )}

                                <ActionButton
                                    IconComponent={Delete}
                                    text={'Delete'}
                                    bgColor={'#FF000014'}
                                    iconColor={'#FF0000'}
                                    onClick={() => openPopup('delete', propertyId)}
                                />
                            </div>
                        </div>
                    </div>

                    <hr className='border border-[#EEEDED]' />

                    <div className='overflow-y-scroll flex flex-col gap-4'>
                        <div className='min-w-[1060px] flex justify-between items-start gap-4'>
                            <div className='flex flex-col gap-4 w-full '>
                                <DetailCard title={'Location Details'}>
                                    <DetailRow
                                        label={'City'}
                                        value={
                                            thisProperty?.Location?.[0]?.[LocationSchema.city]
                                        }
                                    />
                                    <DetailRow
                                        label={'Full Address'}
                                        value={
                                            thisProperty?.Location?.[0]?.[LocationSchema.address]
                                        }
                                        multiline
                                    />
                                </DetailCard>

                                <DetailCard title={'Property Type & Structure'}>
                                    <DetailRow
                                        label={'Type'}
                                        value={thisProperty[PropertiesSchema.type]}
                                    />

                                    <DetailRow
                                        label={'Gender Preference'}
                                        value={
                                            thisProperty[PropertiesSchema.gender_prefrence]
                                        }
                                    />
                                    <DetailRow
                                        label={'Furnishing'}
                                        value={thisProperty[PropertiesSchema.furnishing]}
                                    />
                                </DetailCard>

                                <DetailCard title={'Amenities'}>
                                    <div className=' w-[302px] flex flex-wrap items-center  gap-x-[30px] gap-y-3'>
                                        {thisProperty?.Amenties?.[0]?.amenties.map(
                                            (item, key) =>
                                            (
                                                <div
                                                    key={key}
                                                    className='flex items-center gap-1.5'
                                                >
                                                    <div className='flex items-center justify-center w-[24px] h-[24px] rounded-[16px] py-[1.6px] px-[4.8px] bg-[#00B80633]'>
                                                        <Check className='w-[14px] h-[14px] text-black' />
                                                    </div>
                                                    <p className='text-[12px] custom-poppins capitalize'>
                                                        {item}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </DetailCard>
                            </div>

                            <div className='flex flex-col gap-4 w-full '>
                                <DetailCard title={'Partner (Owner) Info'}>
                                    <DetailRow
                                        label={'Name'}
                                        value={
                                            thisProperty?.Partner?.[partnerInfoSchema.name]
                                        }
                                    />
                                    <DetailRow
                                        label={'Phone Number'}
                                        value={
                                            thisProperty?.Partner?.[partnerInfoSchema.phone]
                                        }
                                    />
                                    <DetailRow
                                        label={'Email'}
                                        value={
                                            thisProperty?.Partner?.[partnerInfoSchema.email]
                                        }
                                    />
                                    <DetailRow
                                        label={'Account Status'}
                                        value={accountStatus}
                                        textColor={accountStatusColor}
                                    />
                                </DetailCard>

                                <DetailCard title={'Rent & Price'}>

                                    {thisProperty?.Rent.map((item) => (
                                        <DetailRow
                                            key={item.id}
                                            label={item.room_type}
                                            value={item.price}
                                        />
                                    ))}

                                </DetailCard>

                                <DetailCard title={'Engagement Metrics'}>
                                    <DetailRow
                                        label={'Total Views'}
                                        value={"520"}
                                    // value={
                                    //     thisProperty[propertySchema.engagement][
                                    //     engagementSchema.totalViews
                                    //     ]
                                    // }
                                    />
                                    <DetailRow
                                        label={'Total Inquiries'}
                                        value={"199"}
                                    // value={
                                    //     thisProperty[propertySchema.engagement][
                                    //     engagementSchema.totalInquiries
                                    //     ]
                                    // }
                                    />
                                    <DetailRow
                                        label={'Last Booking'}
                                        value={"Today"}
                                    // value={
                                    //     thisProperty[propertySchema.engagement][
                                    //     engagementSchema.lastBooking
                                    //     ]
                                    // }
                                    />
                                </DetailCard>
                            </div>

                            <div className='flex flex-col gap-4 w-full '>
                                <DetailCard title={'Photos / Media'}>
                                    <p className='text-[#838383] text-[12px] custom-poppins'>
                                        Walkthrough Video
                                    </p>
                                    <img
                                        className='h-[100px] w-[200px] rounded-[10px]'
                                        src={
                                            `/images${thisProperty[PropertiesSchema.video]}`
                                        }
                                    />

                                    <p className='text-[#838383] text-[12px] custom-poppins'>
                                        Property Front & Surrounding
                                    </p>
                                    <div className='flex gap-4 items-center min-w-[176px]'>
                                        {thisProperty[PropertiesSchema.images]
                                            .slice(0, 2)
                                            .map((img, i) => (
                                                <img
                                                    key={i}
                                                    className='h-[80px] w-[80px] rounded-[10px]'
                                                    src={`/images/${img}`}
                                                />
                                            ))}
                                    </div>

                                    <p className='text-[#838383] text-[12px] custom-poppins'>
                                        Double Sharing
                                    </p>
                                    <div className='flex gap-4 items-center min-w-[176px]'>
                                        {thisProperty[PropertiesSchema.images]
                                            .slice(2, 4)
                                            .map((img, i) => (
                                                <img
                                                    key={i}
                                                    className='h-[80px] w-[80px] rounded-[10px]'
                                                    src={`/images/${img}`}
                                                />
                                            ))}
                                    </div>


                                    <p className='text-[#838383] text-[12px] custom-poppins'>
                                        Private Room
                                    </p>
                                    <div className='flex gap-4 items-center min-w-[176px]'>
                                        {thisProperty[PropertiesSchema.images]
                                            .slice(0, 2)
                                            .map((img, i) => (
                                                <img
                                                    key={i}
                                                    className='h-[80px] w-[80px] rounded-[10px]'
                                                    src={`/images/${img}`}
                                                />
                                            ))}
                                    </div>

                                </DetailCard>
                            </div>
                        </div>

                        <hr className='border border-[#EEEDED]' />

                        <div className='flex flex-col gap-4 w-full'>
                            <p className='custom-medium text-[14px] text-[#FF6A00]'>
                                Booking History
                            </p>

                            <div className='flex justify-center items-center'>
                                <p>No Booking History</p>
                            </div>
                            {/* 
                    {thisProperty[propertySchema.bookings].length > 0 ? (
                        <div className='border border-[#EEEDED] rounded-[20px] overflow-hidden'>
                            <div className='overflow-y-auto max-h-[345px]'>
                                <table className='w-full custom-poppins border-collapse'>
                                    <thead className='bg-[#FFECDE] sticky top-0 z-10'>
                                        <tr className='h-[46px] text-left text-black text-[12px]'>
                                            <th className='p-2.5 pl-6 font-normal'>
                                                Date
                                            </th>
                                            <th className='p-2.5 font-normal'>
                                                Booking ID
                                            </th>
                                            <th className='p-2.5 font-normal'>
                                                Tenant Name
                                            </th>
                                            <th className='p-2.5 font-normal'>
                                                Room Type
                                            </th>
                                            <th className='p-2.5 font-normal'>
                                                Check-In
                                            </th>
                                            <th className='p-2.5 font-normal'>
                                                Status
                                            </th>
                                            <th className='p-2.5 font-normal'>
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className='bg-white'>
                                        {Object.values(
                                            thisProperty[
                                            propertySchema.bookings
                                            ]
                                        ).map((item, key) => (
                                            <tr
                                                key={key}
                                                className='h-[38px] border-[#EDEDED] text-black'
                                            >
                                                <td className='text-[12px] p-2.5 pl-6'>
                                                    {item[bookingsSchema.date]}
                                                </td>

                                                <td className='text-[12px] p-2.5'>
                                                    {
                                                        item[
                                                        bookingsSchema
                                                            .bookingId
                                                        ]
                                                    }
                                                </td>

                                                <td className='text-[12px] p-2.5'>
                                                    {
                                                        item[
                                                        bookingsSchema
                                                            .tenantName
                                                        ]
                                                    }
                                                </td>

                                                <td className='text-[12px] p-2.5'>
                                                    {
                                                        item[
                                                        bookingsSchema
                                                            .roomType
                                                        ]
                                                    }
                                                </td>

                                                <td className='text-[12px] p-2.5'>
                                                    {
                                                        item[
                                                        bookingsSchema
                                                            .checkIn
                                                        ]
                                                    }
                                                </td>

                                                <td className='text-[12px] p-2.5'>
                                                    {
                                                        item[
                                                        bookingsSchema
                                                            .status
                                                        ]
                                                    }
                                                </td>

                                                <td className='text-[12px] p-2.5'>
                                                    {
                                                        item[
                                                        bookingsSchema
                                                            .amount
                                                        ]
                                                    }
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
                    )} */}
                        </div>

                    </div>
                </div>

            )}
        </>
    )
}

export default PropertyDetails

