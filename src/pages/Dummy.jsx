import React, { useEffect } from 'react'
import { supabase } from '../call_handler/supabase-client'
const Dummy = () => {

  const getData = async () => {
    const { data, error } = await supabase.from('Partner').select('* , Properties(* , StatusControls(*) , Location(*) , Rent(*) , Amenties(*) ) ')

    if (data) {
      console.log(data);

    } else {
      console.log(error);

    }

    // const {data : propertyData , error : propertyError} = await supabase.from('Properties').select('*')
    // console.log(propertyData);

  }


  const addData = async () => {

    // const { data: partnerData, error: partnerError } = await supabase.from('Partner').insert({
    //   name: "Shubham Saini",
    //   phone: "+91 8278568770",
    //   email: "shubhamsaini8965@gmail.com",
    //   account_status: "Verified"
    // }).select().single()

    // partnerData ? console.log("Partner Data , Done!") : console.log(partnerError);


    const { data: propertyData, error: propertyError } = await supabase.from('Properties').insert({
      furnishing: "Fully Furnished",
      title: "Deepak Pg ",
      type: "PG ",
      gender_prefrence: "Male ",
      images: [
        '/image1.png',
        '/image2.png',
        '/image3.png',
        '/image4.png',
        '/image5.png',
        '/image6.png',
        '/image7.png',
      ],
      video: "/image1.png",
      pg_id: 7
    }).select().single()

    propertyData ? console.log("Property Data , Done!") : console.log(propertyError);

    const { data: statusControlData, error: statusControlError } = await supabase.from('StatusControls').insert({
      isBlocked: false,
      isVerified: false,
      isDeleted: false,
      blockReason: null,
      active: true,
      pg_id: propertyData.id
    }).select().single()

    statusControlData ? console.log("Status Data , Done!") : console.log(statusControlError);

    const { data: LocationData, error: LocationError } = await supabase.from('Location').insert({
      city: "Delhi",
      locality: "Rohini Sector 11",
      address: "Near Metro Station",
      pg_id: propertyData.id
    }).select().single()

    LocationData ? console.log("Location Data , Done!") : console.log(LocationError);


    const { data: RentData, error: RentError } = await supabase.from('Rent').insert({
      room_types: [
        {
          "type": "Single Room",
          "price": 15000
        },
        {
          "type": "Triple Sharing",
          "price": 9000
        }
      ],
      pg_id: propertyData.id
    }).select().single()

    RentData ? console.log("Rent Data , Done!") : console.log(RentError);



    const { data: AmentiesData, error: AmentiesError } = await supabase.from('Amenties').insert({
      wifi: true,
      laundry: true,
      ac: true,
      pg_id: propertyData.id
    }).select().single()

    AmentiesData ? console.log("Ameties Data , Done!") : console.log(AmentiesError);

  }




  return (
    <>
      <div>
        <button onClick={addData} className='border'>AddData</button>
        <button onClick={getData} className='border'>GetData</button>

        <div className={`${activeFilter === "listingDate" ? "bg-[#F9F9F9] p-[10px] rounded-[10px]" : ""}`}>
          <div
            onClick={() => toggleFilter("listingDate")}
            className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex items-center justify-between 
              border-[#EEEDED] text-[#838383] text-[14px] cursor-pointer"
          >
            Verification Status
            {activeFilter === "listingDate" ? <UpArrow /> : <DownArrow />}
          </div>

       
        </div>


      </div>



      {/*  */}





    </>
  )
}

export default Dummy



// import React, { useEffect, useRef, useState } from 'react'
// import useProperties from '../context/PropertiesContext'
// import axios from 'axios'
import DownArrow from '../../public/svg/DownArrow.svg?react'
import UpArrow from '../../public/svg/UpArrow.svg?react'
// import Check from '../../public/svg/Check.svg?react'
// import Cross from '../../public/svg/Cross.svg?react'
// import Rupee from '../../public/svg/Rupee.svg?react'
// import CalendarIcon from '../../public/svg/CalendarIcon.svg?react'

// const PropertyFilters = () => {
//   const { propertyFilterIsOpen, setPropertyFilterIsOpen } = useProperties();
//   const [listedDateFrom, setListedDateFrom] = useState("");
//   const [listedDateTo, setListedDateTO] = useState("");
//   const ListedDateFromInput = useRef(null);
//   const ListedDateToInput = useRef(null);
//   const [city, setCity] = useState('');
//   const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
//   const initialFilter = {
//     city: "",
//     locality: [],
//     status: {
//       all: false,
//       active: false,
//       inactive: false,
//       blocked: false,
//     },
//     verficationStatus: {
//       all: false,
//       verified: false,
//       unverified: false
//     },
//     listedDate: {
//       from: "",
//       to: ""
//     },
//     propertyType: {
//       all: false,
//       pg: false,
//       flat: false,
//       hostel: false
//     },
//     furnishing: {
//       all: false,
//       fullyFurnished: false,
//       semiFurnished: false,
//       unfurnished: false
//     },
//     rentRange: {
//       min: "",
//       max: ""
//     },
//   };

//   const [filter, setFilter] = useState(initialFilter);

//   const initialOpenSection = {
//     locality: false,
//     status: false,
//     verficationStatus: false,
//     listedDate: false,
//     propertyType: false,
//     furnishing: false,
//     rentRange: false
//   }
//   const [openSections, setOpenSections] = useState(initialOpenSection);

//   const handleIconClick = (inputRef) => {
//     if (inputRef.current.showPicker) {
//       inputRef.current.showPicker();
//     } else {
//       inputRef.current.click();
//     }
//   };

//   const formatDate = (value) => {
//     return new Date(value).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const reset = (item) => {
//     setFilter(initialFilter);
//     setCity("");
//     setListedDateFrom("");
//     setListedDateTO("");
//     setCityDropdownOpen(false);
//     setOpenSections(initialOpenSection)
//     setCityDropdownOpen(false)

//     if (item === 'close') {
//       setPropertyFilterIsOpen(false)
//     }

//   }

//   // ✅ Accordion logic
//   const toggleSection = (key) => {
//     setOpenSections((prev) => {
//       const isCurrentlyOpen = prev[key];

//       const newState = Object.keys(prev).reduce((acc, sectionKey) => {
//         acc[sectionKey] = false;
//         return acc;
//       }, {});

//       newState[key] = !isCurrentlyOpen;

//       return newState;
//     });

//     if (key !== "locality") setCityDropdownOpen(false);
//   };

//   // const filteredCity = properties.filter(
//   //   (item) => item[propertySchema.locationDetails][locationDetailsSchema.city] === city
//   // );

//   // const buildRefinedFilter = (filter) => {
//   //   const params = new URLSearchParams();

//   //   if (filter.city) params.append("locationDetails.city", filter.city);

//   //   if (filter.locality.length > 0) {
//   //     filter.locality.forEach((loc) => params.append("locationDetails.locality", loc));
//   //   }

//   //   if (filter.status.active) params.append("active", true);
//   //   if (filter.status.inactive) params.append("active", false);
//   //   if (filter.status.blocked) params.append("statusControls.isBlocked", true);

//   //   if (filter.verficationStatus.verified) params.append("partnerInfo.accountStatus", "Verified");
//   //   if (filter.verficationStatus.unverified)
//   //     params.append("partnerInfo.accountStatus", "Pending Verification");

//   //   if (filter.listedDate.from) params.append("listedOn_gte", filter.listedDate.from);
//   //   if (filter.listedDate.to) params.append("listedOn_lte", filter.listedDate.to);

//   //   if (filter.propertyType.pg) params.append("propertyType", "PG");
//   //   if (filter.propertyType.flat) params.append("propertyType", "Flat");
//   //   if (filter.propertyType.hostel) params.append("propertyType", "Hostel");

//   //   if (filter.furnishing.fullyFurnished) params.append("furnishing", "Fully Furnished");
//   //   if (filter.furnishing.semiFurnished) params.append("furnishing", "Semi Furnished");
//   //   if (filter.furnishing.unfurnished) params.append("furnishing", "Unfurnished");

//   //   if (filter.rentRange.min) params.append("rent.minRange_gte", filter.rentRange.min);
//   //   if (filter.rentRange.max) params.append("rent.maxRange_lte", filter.rentRange.max);

//   //   return params.toString();
//   // };

//   const ApplyFilter = async () => {
//     try {
//       const refinedFilter = buildRefinedFilter(filter);
//       const res = await axios.get(`http://localhost:3000/Properties?${refinedFilter}`);
//       setFilteredProperties(res.data);
//       setPropertyFilterIsOpen(false);
//     } catch (error) {
//       console.error("❌ Filter error:", error);
//     }
//   };


//   return (

//     <>
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-200 ${propertyFilterIsOpen ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//         onClick={() => reset('close')}
//       />

//       {/* Right Drawer */}
//       <div
//         className={`fixed top-0 right-0 z-60 w-[370px] h-full rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[20px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col gap-[20px] ${propertyFilterIsOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//       >
//         <p className="text-[16px] custom-semibold text-[#FF6A00]">Filter Bookings</p>

//         <div className="overflow-y-scroll h-full flex flex-col gap-[10px]">
//           {/* Locality */}
//           <FilterSection
//             isOpen={openSections.locality}
//             onToggle={() => toggleSection("locality")}
//             title={"Locality"}
//           >

//             {openSections.locality && (
//               <>
//                 <div
//                   onClick={() => {
//                     setCityDropdownOpen(!cityDropdownOpen)

//                   }}
//                   className="relative bg-white w-full h-[44px] rounded-[14px] border px-[14px] flex items-center justify-between border-[#EEEDED] text-[#838383] text-[14px] custom-poppins cursor-pointer"
//                 >
//                   <select
//                     className="appearance-none bg-transparent w-full outline-none cursor-pointer"
//                     value={city}
//                     onChange={(e) => {
//                       const selectedCity = e.target.value;
//                       setCity(selectedCity);
//                       setFilter((prev) => ({
//                         ...prev,
//                         city: selectedCity,
//                         locality: [],
//                       }));
//                     }}
//                   >
//                     <option value="">Select City</option>
//                     {[...new Set(
//                       properties.map(
//                         (item) =>
//                           item[propertySchema.locationDetails][locationDetailsSchema.city]
//                       )
//                     )].map((cityName, key) => (
//                       <option key={key} value={cityName}>
//                         {cityName}
//                       </option>
//                     ))}
//                   </select>

//                   <span className="pointer-events-none absolute right-3">
//                     {cityDropdownOpen ? (
//                       <UpArrow className="w-[22px] h-[22px] text-[#838383]" />
//                     ) : (
//                       <DownArrow className="w-[22px] h-[22px] text-[#838383]" />
//                     )}
//                   </span>
//                 </div>

//                 {city && (
//                   <div className="flex flex-wrap items-center gap-[14px] w-full max-h-[130px] overflow-y-scroll">
//                     {[...new Set(
//                       filteredCity.map(
//                         (item) =>
//                           item[propertySchema.locationDetails][locationDetailsSchema.locality]
//                       )
//                     )].map((localityName, key) => {
//                       const isSelected = filter.locality.includes(localityName);

//                       return (
//                         <div
//                           key={key}
//                           onClick={() =>
//                             setFilter((prev) => ({
//                               ...prev,
//                               locality: isSelected
//                                 ? prev.locality.filter((loc) => loc !== localityName)
//                                 : [...prev.locality, localityName],
//                             }))
//                           }
//                           className={`h-[34px] rounded-[20px] py-1.5 px-3 flex gap-[6px] items-center justify-between text-[14px] custom-poppins cursor-pointer transition-all ${isSelected
//                             ? "bg-[#FF6A00] text-white"
//                             : "bg-white text-[#838383] border border-[#EEEDED]"
//                             }`}
//                         >
//                           {localityName}

//                           {isSelected ? (
//                             <Cross className="w-[18px] h-[18px]" />
//                           ) : (
//                             <Check className="w-[18px] h-[18px] text-[#838383]" />
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </>
//             )}
//           </FilterSection>

//           {/* Status */}
//           <FilterSection
//             isOpen={openSections.status}
//             onToggle={() => toggleSection("status")}
//             title={"Status"}
//           >
//             {openSections.status && (
//               <div className='flex flex-col custom-poppins text-[#838383] text-[14px] items-start justify-between px-2.5 gap-[8px] w-full max-h-[130px] overflow-y-scroll'>

//                 {[
//                   { label: "All", key: "all" },
//                   { label: "Active", key: "active" },
//                   { label: "Inactive", key: "inactive" },
//                   { label: "Blocked", key: "blocked" }
//                 ].map((item, index) => {

//                   const isSelected = filter.status[item.key];

//                   return (
//                     <div
//                       key={index}
//                       onClick={() => {
//                         setFilter(prev => ({
//                           ...prev,
//                           status: {
//                             ...prev.status,
//                             [item.key]: !isSelected
//                           }
//                         }));
//                       }}
//                       className='flex items-center justify-start gap-2.5 cursor-pointer'
//                     >
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         readOnly
//                       />
//                       <label>{item.label}</label>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}


//           </FilterSection>

//           {/* Verification Status */}

//           <FilterSection
//             title={"Verification Status"}
//             onToggle={() => toggleSection("verficationStatus")}
//             isOpen={openSections.verficationStatus}
//           >
//             {openSections.verficationStatus && (
//               <div className='flex flex-col custom-poppins text-[#838383] text-[14px] items-start justify-between px-2.5 gap-[8px] w-full max-h-[130px] overflow-y-scroll'>
//                 {[
//                   { label: "All", key: "all" },
//                   { label: "Verified", key: "verified" },
//                   { label: "Unverified", key: "unverified" }
//                 ].map((item, index) => {

//                   const isSelected = filter.verficationStatus[item.key]
//                   return (
//                     <div
//                       onClick={() => {
//                         setFilter((prev) => ({
//                           ...prev,
//                           verficationStatus: {
//                             ...prev.verficationStatus,
//                             [item.key]: !isSelected
//                           }
//                         }))
//                       }}
//                       key={index}
//                       className='flex items-center justify-start gap-2.5'>
//                       <input
//                         type="checkbox"
//                       />
//                       <label> {item.label}</label>
//                     </div>
//                   )
//                 })}
//               </div>


//             )}

//           </FilterSection>

//           {/* Listed Date */}

//           <FilterSection
//             title={"Listed Date"}
//             onToggle={() => toggleSection("listedDate")}
//             isOpen={openSections.listedDate}
//           >

//             {openSections.listedDate && (
//               <div className='flex items-center justify-between gap-2.5 '>
//                 <div
//                   className="flex w-full bg-white items-center justify-between h-[44px] rounded-[14px] border border-[#EEEDED] px-4 gap-2.5">

//                   <label
//                     className={`text-[14px] custom-poppins ${listedDateFrom ? "text-black" : "text-[#838383]"
//                       }`}
//                   >
//                     {listedDateFrom ? formatDate(listedDateFrom) : "From"}
//                   </label>

//                   <div className="relative">
//                     <input
//                       ref={ListedDateFromInput}
//                       type="date"
//                       onChange={(e) => {
//                         setListedDateFrom(e.target.value)
//                         setFilter(prev => ({
//                           ...prev,
//                           listedDate: { ...prev.listedDate, from: e.target.value }
//                         }));
//                       }}
//                       className="absolute opacity-0 w-full z-10 "

//                     />

//                     <CalendarIcon
//                       onClick={() => handleIconClick(ListedDateFromInput)}
//                       className="w-5 h-5 text-gray-500 cursor-pointer relative z-20"
//                     />

//                   </div>
//                 </div>

//                 <div
//                   className="flex w-full bg-white items-center justify-between h-[44px] rounded-[14px] border border-[#EEEDED] px-4 gap-2.5">

//                   <label
//                     className={`text-[14px] custom-poppins ${listedDateTo ? "text-black" : "text-[#838383]"
//                       }`}
//                   >
//                     {listedDateTo ? formatDate(listedDateTo) : "To"}
//                   </label>

//                   <div className="relative">
//                     <input
//                       ref={ListedDateToInput}
//                       type="date"
//                       onChange={(e) => {
//                         setListedDateTO(e.target.value)
//                         setFilter(prev => ({
//                           ...prev,
//                           listedDate: { ...prev.listedDate, to: e.target.value }
//                         }));
//                       }}
//                       className="absolute opacity-0 w-full z-10 "

//                     />

//                     <CalendarIcon
//                       onClick={() => handleIconClick(ListedDateToInput)}
//                       className="w-5 h-5 text-gray-500 cursor-pointer relative z-20"
//                     />

//                   </div>
//                 </div>


//               </div>

//             )}

//           </FilterSection>

//           {/* Property Type */}

//           <FilterSection
//             title={"Property Type"}
//             onToggle={() => toggleSection("propertyType")}
//             isOpen={openSections.propertyType}
//           >

//             {openSections.propertyType && (
//               <div className='flex flex-col custom-poppins text-[#838383] text-[14px] items-start justify-between px-2.5 gap-[8px] w-full max-h-[130px] overflow-y-scroll'>
//                 {[
//                   { label: "All", key: "all" },
//                   { label: "Paying Guest", key: "pg" },
//                   { label: "Flat", key: "flat" },
//                   { label: "Hostel", key: "hostel" }
//                 ].map((item, index) => {
//                   const isSelected = filter.propertyType[item.key]
//                   return (
//                     <div
//                       onClick={() => {
//                         setFilter((prev) => ({
//                           ...prev,
//                           propertyType: {
//                             ...prev.propertyType,
//                             [item.key]: !isSelected
//                           }
//                         }))
//                       }}
//                       key={index}
//                       className='flex items-center justify-start gap-2.5'>
//                       <input
//                         type="checkbox"
//                       />
//                       <label> {item.label}</label>
//                     </div>
//                   )
//                 })}
//               </div>
//             )}

//           </FilterSection>

//           {/* Furnishing */}
//           <FilterSection
//             title={"Furnishing"}
//             onToggle={() => toggleSection("furnishing")}
//             isOpen={openSections.furnishing}
//           >
//             {openSections.furnishing && (
//               <div className='flex flex-col custom-poppins text-[#838383] text-[14px] items-start justify-between px-2.5 gap-[8px] w-full max-h-[130px] overflow-y-scroll'>
//                 {[
//                   { label: "All", key: "all" },
//                   { label: "Fully Furnished", key: "fullyFurnished" },
//                   { label: "Semi Furnished", key: "semiFurnished" },
//                   { label: "UnFurnished", key: "unfurnished" },
//                 ].map((item, index) => {
//                   const isSelected = filter.furnishing[item.key]
//                   return (
//                     <div
//                       onClick={() => {
//                         setFilter((prev) => ({
//                           ...prev,
//                           furnishing: {
//                             ...prev.furnishing,
//                             [item.key]: !isSelected
//                           }
//                         }))
//                       }}
//                       key={index}
//                       className='flex items-center justify-start gap-2.5'>
//                       <input
//                         type="checkbox"
//                       />
//                       <label> {item.label}</label>
//                     </div>
//                   )
//                 })}

//               </div>
//             )}
//           </FilterSection>

//           {/* Rent Range */}
//           <FilterSection
//             title={"Rent Range"}
//             onToggle={() => toggleSection("rentRange")}
//             isOpen={openSections.rentRange}
//           >
//             {openSections.rentRange && (
//               <div className='flex items-center justify-between h-[44px] gap-2.5'>
//                 <div className='w-full relative bg-white rounded-[14px]  border border-[#EEEDED] p-3.5 flex flex-col gap-2.5'>
//                   <Rupee className="absolute w-[22px] h-[22px] top-4 text-[#838383]" />
//                   <input
//                     onChange={(e) => setFilter(prev => ({
//                       ...prev,
//                       rentRange: { ...prev.rentRange, min: e.target.value }
//                     }))}

//                     type="text"
//                     placeholder='Min'
//                     className='outline-none w-full pl-7 text-[#838383] text-[14px] custom-poppins'
//                   />
//                 </div>
//                 <div className='w-full relative bg-white rounded-[14px]  border border-[#EEEDED] p-3.5 flex flex-col gap-2.5'>
//                   <Rupee className="absolute w-[22px] h-[22px] top-4 text-[#838383]" />
//                   <input
//                     onChange={(e) => setFilter(prev => ({
//                       ...prev,
//                       rentRange: { ...prev.rentRange, max: e.target.value }
//                     }))}

//                     type="text"
//                     placeholder='Max'
//                     className='outline-none pl-7 w-full text-[#838383] text-[14px] custom-poppins'
//                   />
//                 </div>

//               </div>
//             )}
//           </FilterSection>
//         </div>


//         {/* Buttons */}
//         <div className="flex items-center justify-center gap-[20px]">
//           <button
//             onClick={() => reset('reset')}
//             className="cursor-pointer border-[#FF6A00] text-[#FF6A00] w-[180px] rounded-[50px] border py-3 px-2.5 flex flex-col items-center justify-center gap-[10px] custom-medium text-[14px] transition-all duration-200 hover:opacity-80"
//           >
//             Reset
//           </button>

//           <button
//             className="border-[#FF6A00] bg-[#FF6A00] w-[180px] rounded-[50px] border py-3 px-2.5 flex flex-col items-center justify-center gap-[10px] text-[white] custom-poppins cursor-pointer text-[14px] transition-all duration-200 hover:opacity-80"
//             onClick={ApplyFilter}
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PropertyFilters;

// export const FilterSection = ({ children, isOpen, onToggle, title }) => {
//   return (
//     <div
//       className={`${isOpen ? "bg-[#F9F9F9] flex flex-col gap-[10px] p-[10px] rounded-[10px]" : ""
//         }`}
//     >
//       <div
//         onClick={onToggle}
//         className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex gap-10px items-center justify-between border-[#EEEDED] outline-none text-[#838383] text-[14px] custom-poppins cursor-pointer"
//       >
//         {title}
//         {isOpen ? (
//           <UpArrow className="w-[24px] h-[24px] text-[#838383]" />
//         ) : (
//           <DownArrow className="w-[24px] h-[24px] text-[#838383]" />
//         )}
//       </div>
//       {children}
//     </div>
//   );
// };

