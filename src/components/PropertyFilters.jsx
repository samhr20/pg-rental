import React, { useEffect, useRef, useState } from 'react'
import useProperties from '../context/PropertiesContext'
import { supabase } from '../call_handler/supabase-client'
import DownArrow from '../../public/svg/DownArrow.svg?react'
import UpArrow from '../../public/svg/UpArrow.svg?react'
import Cross from '../../public/svg/Cross.svg?react'
import Check from '../../public/svg/Check.svg?react'
import CalendarIcon from '../../public/svg/CalendarIcon.svg?react'
import Rupee from '../../public/svg/Rupee.svg?react'


const PropertyFilters = () => {

  const { propertyFilterIsOpen, setPropertyFilterIsOpen, setFilteredProperties, filteredProperties } = useProperties()

  // which section is open? "locality" or "status" or null
  const [activeFilter, setActiveFilter] = useState(null)

  // supabase data
  const [cities, setCities] = useState([])
  const [localities, setLocalities] = useState([])

  // user-selected data

  const initialData = {
    city: "",
    locality: [],
    status: {
      all: false,
      active: false,
      inactive: false,
      blocked: false,
    },
    verification: {
      all: false,
      verified: false,
      unverified: false
    },
    listedDate: {
      from: "",
      to: "",
    },
    rentRange: {
      min: '',
      max: ''
    }
  }
  const [data, setData] = useState(initialData)
  const ListedDateFromInput = useRef(null)
  const ListedDateToInput = useRef(null)

  // fetch cities
  const getCities = async () => {
    const { data: cityData } = await supabase.from("Location").select("city")
    if (cityData) setCities(cityData)
  }

  // fetch localities based on selected city
  const getLocality = async () => {
    if (!data.city) return
    const { data: localityData } = await supabase
      .from("Location")
      .select("locality")
      .eq("city", data.city)

    if (localityData) setLocalities(localityData)
  }

  // run when city changes
  useEffect(() => {
    if (data.city) getLocality()
  }, [data.city])

  // open a filter & auto close other one
  const toggleFilter = (section) => {
    setActiveFilter(prev => prev === section ? null : section)
  }

  const ApplyFilter = async () => {

    const isEmpty = JSON.stringify(data) === JSON.stringify(initialData);

    if (isEmpty) {
      alert("ADD FILTERS");
      return;
    }

    if ((data.rentRange.min && !data.rentRange.max) || (!data.rentRange.min && data.rentRange.max)) {
      alert("Please fill both Min and Max rent values.");
      return;
    }

    if ((data.listedDate.from && !data.listedDate.to) || (!data.listedDate.from && data.listedDate.to)) {
      alert("Please select both From and To listing dates.");
      return;
    }


    let query = supabase.from("Properties").select(` title , created_at , id , images, Rent!inner(*), Location!inner(locality, city), Amenties(*), StatusControls!inner(*) `);

    // City ....
    if (data.city) {
      query = query.eq("Location.city", data.city);
    }

    // Locality ....
    if (data.locality.length > 0) {
      query = query.in("Location.locality", data.locality);
    }


    // Status ....


    if (data.status.all) {
      // skip
    }
    else if (data.status.active && data.status.inactive && data.status.blocked) {
      // skip
    }
    else if (data.status.active && data.status.inactive) {
      // skip
    }
    else if (data.status.active && data.status.blocked) {
      query = query
        .eq("StatusControls.active", true)
        .eq("StatusControls.isBlocked", true);
    }
    else if (data.status.inactive && data.status.blocked) {
      query = query
        .eq("StatusControls.active", false)
        .eq("StatusControls.isBlocked", true);
    }
    else if (data.status.active) {
      query = query.eq("StatusControls.active", true);
    }
    else if (data.status.inactive) {
      query = query.eq("StatusControls.active", false);
    }
    else if (data.status.blocked) {
      query = query.eq("StatusControls.isBlocked", true);
    }

    // Verification ....

    if (data.verification.all) {
      // skip
    } else if (data.verification.verified && data.verification.unverified) {
      // skip
    } else if (data.verification.verified) {
      query = query.eq('StatusControls.isVerified', true)
    } else if (data.verification.unverified) {
      query = query.eq('StatusControls.isVerified', false)
    }


    // Listing Date....

    if (data.listedDate.from) query = query.gte("created_at", data.listedDate.from)
    if (data.listedDate.to) query = query.lte("created_at", data.listedDate.to)


    // Rent range 

    const min = Number(data.rentRange.min)
    const max = Number(data.rentRange.max)


    if (min) query = query.gte("Rent.price", min)
    if (max) query = query.lte("Rent.price", max)

    const { data: filtered, error } = await query


    if (filtered) {

      const updated = filtered.map(item => {
        const rents = item.Rent || [];

        const lowestPrice = rents.length
          ? Math.min(...rents.map(r => Number(r.price)))
          : null;

        return {
          ...item,
          lowestPrice,
        };
      });

      console.log(updated);

      setFilteredProperties(updated);

      console.log("FILTER RESULT:", filtered);
    };
  }


  const reset = () => {
    setData(initialData)
    setActiveFilter(null)
  }


  const handleIconClick = (inputRef) => {
    if (inputRef.current.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current.click();
    }
  };
  const formatDate = (value) => {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-50 transition-opacity 
        ${propertyFilterIsOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setPropertyFilterIsOpen(false)}
      />

      {/* RIGHT DRAWER */}
      <div
        className={`fixed top-0 right-0 z-60 w-[370px] h-full rounded-tl-[30px] rounded-bl-[30px] 
        px-[20px] py-[20px] bg-white shadow-lg transform duration-300 ease-in-out flex flex-col gap-[20px]
        ${propertyFilterIsOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <p className="text-[16px] custom-semibold text-[#FF6A00]">Filter Bookings</p>

        <div className="overflow-y-scroll h-full flex flex-col gap-[10px]">

          {/* ---------------- LOCALITY FILTER ---------------- */}
          <div className={`${activeFilter === "locality" ? "bg-[#F9F9F9] p-[10px] rounded-[10px]" : ""}`}>
            <div
              onClick={() => {
                setActiveFilter(prev => {
                  const newState = prev === "locality" ? null : "locality";
                  if (newState === "locality" && cities.length === 0) {
                    getCities();
                  }

                  return newState
                })
              }}
              className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex items-center justify-between 
              border-[#EEEDED] text-[#838383] text-[14px] cursor-pointer"
            >
              Locality
              {activeFilter === "locality" ? <UpArrow /> : <DownArrow />}
            </div>

            {activeFilter === "locality" && (
              <>
                {/* CITY SELECT */}
                <div className="relative bg-white w-full h-[44px] rounded-[14px] border px-[14px] 
                flex items-center justify-between border-[#EEEDED] text-[#838383] text-[14px] mt-2">

                  <select
                    className="bg-transparent w-full outline-none cursor-pointer"
                    value={data.city}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      city: e.target.value,
                      locality: [] // reset locality when city changes
                    }))}
                  >
                    <option value="">Select City</option>

                    {[...new Set(cities.map(c => c.city))].map((cityName, i) => (
                      <option key={i} value={cityName}>{cityName}</option>
                    ))}

                  </select>

                  <span className="absolute right-3 pointer-events-none">
                    <DownArrow />
                  </span>
                </div>

                {/* LOCALITY SELECT */}
                {data.city !== "" && (
                  <div className="flex flex-wrap items-center gap-[14px] max-h-[130px] overflow-y-scroll mt-2">

                    {[...new Set(localities.map(l => l.locality))].map((loc, key) => {
                      const isSelected = data.locality.includes(loc)

                      return (
                        <div
                          key={key}
                          onClick={() =>
                            setData(prev => ({
                              ...prev,
                              locality: isSelected
                                ? prev.locality.filter(item => item !== loc)
                                : [...prev.locality, loc]
                            }))
                          }
                          className={`h-[34px] rounded-[20px] py-1.5 px-3 flex gap-[6px] items-center 
                          text-[14px] cursor-pointer transition-all
                          ${isSelected
                              ? "bg-[#FF6A00] text-white"
                              : "bg-white text-[#838383] border border-[#EEEDED]"
                            }`}
                        >
                          {loc}
                          {isSelected ? <Cross /> : <Check />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* --------------- STATUS FILTER ---------------- */}
          <div className={`${activeFilter === "status" ? "bg-[#F9F9F9] p-[10px] rounded-[10px]" : ""}`}>
            <div
              onClick={() => toggleFilter("status")}
              className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex items-center justify-between 
              border-[#EEEDED] text-[#838383] text-[14px] cursor-pointer"
            >
              Status
              {activeFilter === "status" ? <UpArrow /> : <DownArrow />}
            </div>

            {activeFilter === "status" && (
              <div className="flex flex-col gap-[8px] px-2.5 mt-2 text-[#838383] text-[14px]">

                {[
                  { label: "All", key: "all" },
                  { label: "Active", key: "active" },
                  { label: "Inactive", key: "inactive" },
                  { label: "Blocked", key: "blocked" }
                ].map((item, index) => {
                  const isSelected = data.status[item.key]

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={() => {
                        const newStatus = {
                          ...data.status,
                          [item.key]: !isSelected,
                        };


                        if (item.key === "all") {
                          const makeAll = !isSelected;
                          newStatus.all = makeAll;
                          newStatus.active = makeAll;
                          newStatus.inactive = makeAll;
                          newStatus.blocked = makeAll;
                        } else {

                          const allSelected =
                            newStatus.active &&
                            newStatus.inactive &&
                            newStatus.blocked;

                          newStatus.all = allSelected;
                        }

                        setData(prev => ({
                          ...prev,
                          status: newStatus
                        }));
                      }}
                    >
                      <input type="checkbox" readOnly checked={isSelected} />
                      <label>{item.label}</label>
                    </div>
                  )
                })}

              </div>
            )}
          </div>

          {/* --------------- VERIFICATION FILTER ---------------- */}
          <div className={`${activeFilter === "verfication" ? "bg-[#F9F9F9] p-[10px] rounded-[10px]" : ""}`}>
            <div
              onClick={() => toggleFilter("verfication")}
              className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex items-center justify-between 
              border-[#EEEDED] text-[#838383] text-[14px] cursor-pointer"
            >
              Verification Status
              {activeFilter === "verification" ? <UpArrow /> : <DownArrow />}
            </div>

            {activeFilter === "verfication" && (
              <div className="flex flex-col gap-[8px] px-2.5 mt-2 text-[#838383] text-[14px]">

                {[
                  { label: "All", key: "all" },
                  { label: "Verified", key: "verified" },
                  { label: "Unverified", key: "unverified" },
                ].map((item, index) => {
                  const isSelected = data.verification[item.key]

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={() => {
                        const newVerification = {
                          ...data.verification,
                          [item.key]: !isSelected,
                        };


                        if (item.key === "all") {
                          const makeAll = !isSelected;
                          newVerification.all = makeAll;
                          newVerification.verified = makeAll;
                          newVerification.unverified = makeAll;

                        } else {
                          const allSelected =
                            newVerification.verified &&
                            newVerification.unverified

                          newVerification.all = allSelected;
                        }

                        setData(prev => ({
                          ...prev,
                          verification: newVerification
                        }));
                      }}
                    >
                      <input type="checkbox" readOnly checked={isSelected} />
                      <label>{item.label}</label>
                    </div>
                  )
                })}

              </div>
            )}
          </div>

          {/* --------------- LISTING DATE FILTER ---------------- */}

          <div className={`${activeFilter === "listingDate" ? "bg-[#F9F9F9] p-[10px] rounded-[10px]" : ""}`}>
            <div
              onClick={() => toggleFilter("listingDate")}
              className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex items-center justify-between 
              border-[#EEEDED] text-[#838383] text-[14px] cursor-pointer"
            >
              Listing Date
              {activeFilter === "listingDate" ? <UpArrow /> : <DownArrow />}
            </div>

            {activeFilter === "listingDate" && (
              <div className='flex items-center justify-between gap-2.5 mt-2'>

                {/* FROM DATE */}
                <div className="flex w-full bg-white items-center justify-between h-[44px] rounded-[14px] border border-[#EEEDED] px-4">
                  <label className={`text-[14px] ${data.listedDate.from ? "text-black" : "text-[#838383]"}`}>
                    {data.listedDate.from ? formatDate(data.listedDate.from) : "From"}
                  </label>

                  <div className="relative">
                    <input
                      ref={ListedDateFromInput}
                      type="date"
                      onChange={(e) =>
                        setData(prev => ({
                          ...prev,
                          listedDate: { ...prev.listedDate, from: e.target.value }
                        }))
                      }
                      className="absolute opacity-0 w-full z-10"
                    />

                    <CalendarIcon
                      onClick={() => handleIconClick(ListedDateFromInput)}
                      className="w-5 h-5 text-gray-500 cursor-pointer z-20"
                    />
                  </div>
                </div>

                {/* TO DATE */}
                <div className="flex w-full bg-white items-center justify-between h-[44px] rounded-[14px] border border-[#EEEDED] px-4">
                  <label className={`text-[14px] ${data.listedDate.to ? "text-black" : "text-[#838383]"}`}>
                    {data.listedDate.to ? formatDate(data.listedDate.to) : "To"}
                  </label>

                  <div className="relative">
                    <input
                      ref={ListedDateToInput}
                      type="date"
                      onChange={(e) =>
                        setData(prev => ({
                          ...prev,
                          listedDate: { ...prev.listedDate, to: e.target.value }
                        }))
                      }
                      className="absolute opacity-0 w-full z-10"
                    />

                    <CalendarIcon
                      onClick={() => handleIconClick(ListedDateToInput)}
                      className="w-5 h-5 text-gray-500 cursor-pointer z-20"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --------------- Property Type FILTER ---------------- */}
          <div className={`${activeFilter === "propertyType" ? "bg-[#F9F9F9] p-[10px] rounded-[10px]" : ""}`}>
            <div
              onClick={() => toggleFilter("propertyType")}
              className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex items-center justify-between 
              border-[#EEEDED] text-[#838383] text-[14px] cursor-pointer"
            >
              Property Type
              {activeFilter === "propertyType" ? <UpArrow /> : <DownArrow />}
            </div>

            {activeFilter === "propertyType" && (
              <div className="flex flex-col gap-[8px] px-2.5 mt-2 text-[#838383] text-[14px]">

                {[
                  { label: "All", key: "all" },
                  { label: "Active", key: "active" },
                  { label: "Inactive", key: "inactive" },
                  { label: "Blocked", key: "blocked" }
                ].map((item, index) => {
                  const isSelected = data.status[item.key]

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={() => {
                        const newStatus = {
                          ...data.status,
                          [item.key]: !isSelected,
                        };


                        if (item.key === "all") {
                          const makeAll = !isSelected;
                          newStatus.all = makeAll;
                          newStatus.active = makeAll;
                          newStatus.inactive = makeAll;
                          newStatus.blocked = makeAll;
                        } else {

                          const allSelected =
                            newStatus.active &&
                            newStatus.inactive &&
                            newStatus.blocked;

                          newStatus.all = allSelected;
                        }

                        setData(prev => ({
                          ...prev,
                          status: newStatus
                        }));
                      }}
                    >
                      <input type="checkbox" readOnly checked={isSelected} />
                      <label>{item.label}</label>
                    </div>
                  )
                })}

              </div>
            )}
          </div>

          {/* --------------- RENT RANGE FILTER ---------------- */}


          <div className={`${activeFilter === "rentRange" ? "bg-[#F9F9F9] p-[10px] rounded-[10px]" : ""}`}>
            <div
              onClick={() => toggleFilter("rentRange")}
              className="bg-white w-full h-[44px] rounded-[14px] border p-[14px] flex items-center justify-between 
              border-[#EEEDED] text-[#838383] text-[14px] cursor-pointer"
            >
              Rent Range
              {activeFilter === "rentRange" ? <UpArrow /> : <DownArrow />}
            </div>

            {activeFilter === "rentRange" && (
              <div className='flex items-center justify-between h-[44px] gap-2.5'>
                <div className='w-full relative bg-white rounded-[14px]  border border-[#EEEDED] p-3.5 flex flex-col gap-2.5'>
                  <Rupee className="absolute w-[22px] h-[22px] top-4 text-[#838383]" />
                  <input
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      rentRange: { ...prev.rentRange, min: e.target.value }
                    }))}

                    type="text"
                    placeholder='Min'
                    className='outline-none w-full pl-7 text-[#838383] text-[14px] custom-poppins'
                  />
                </div>
                <div className='w-full relative bg-white rounded-[14px]  border border-[#EEEDED] p-3.5 flex flex-col gap-2.5'>
                  <Rupee className="absolute w-[22px] h-[22px] top-4 text-[#838383]" />
                  <input
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      rentRange: { ...prev.rentRange, max: e.target.value }
                    }))}

                    type="text"
                    placeholder='Max'
                    className='outline-none pl-7 w-full text-[#838383] text-[14px] custom-poppins'
                  />
                </div>

              </div>

            )}
          </div>


        </div>


        {/* --------------- BUTTONS ---------------- */}
        <div className="flex items-center justify-center gap-[20px]">
          <button
            onClick={reset}
            className="cursor-pointer border-[#FF6A00] text-[#FF6A00] w-[180px] rounded-[50px] border py-3 px-2.5 flex flex-col items-center justify-center gap-[10px] custom-medium text-[14px] transition-all duration-200 hover:opacity-80"
          >
            Reset
          </button>

          <button
            className="border-[rgb(255,106,0)] bg-[#FF6A00] w-[180px] rounded-[50px] border py-3 px-2.5 flex flex-col items-center justify-center gap-[10px] text-[white] custom-poppins cursor-pointer text-[14px] transition-all duration-200 hover:opacity-80"
            onClick={ApplyFilter}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}

export default PropertyFilters
