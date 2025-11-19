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
    <div>
      <button onClick={addData} className='border'>AddData</button>
      <button onClick={getData} className='border'>GetData</button>
    </div>
  )
}

export default Dummy