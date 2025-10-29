export const propertySchema = {
    propertyId:"propertyId",
    propertyName:"propertyName",
    active:"active",
    listedOn:"listedOn",
    statusControls:"statusControls",
    locationDetails:"locationDetails",
    partnerInfo:"partnerInfo",
    propertyType :"propertyType",
    furnishing:"furnishing",
    genderPreference : "genderPreference",
    rent : "rent",
    amenities : "amenities",
    engagement : "engagement",
    media : "media",
    bookings : "bookings"
}

export const statusControlsSchema ={
    isBlocked:"isBlocked",
    isVerified:"isVerified",
    isDeleted:"isDeleted",
    blockReason:"blockReason"
}

export const locationDetailsSchema = {
    city : "city",
    locality : "locality",
    address : "address"
}
export const partnerInfoSchema ={
    name : "name",
    phone : "phone",
    email : "email",
    accountStatus : "accountStatus"
}
export const rentSchema = {
    roomTypes : "roomTypes",
    minRange : "minRange",
    maxRange : "maxRange"
}

export const roomTypesSchema= {
    type :"type",
    price : "price"
}
export const amenitiesSchema = {
    wifi : "wifi",
    parking : "parking",
    laundry : "laundry",
    security : "security",
    ac : "ac",
    meals : "meals",
    housekeeping : "housekeeping",
    cctv : "cctv",
    lift : "lift",
    powerBackup : "powerBackup",
    geyser : "geyser",
    gym : "gym",
    attachedWashroom : "attachedWashroom",
    balcony : "balcony",
    refrigerator : "refrigerator",
    roWater : "roWater",
    tv :"tv",
    studyTable : "studyTable"
}

export const engagementSchema = {
    totalViews : "totalViews",
    totalInquiries : "totalInquiries",
    lastBooking : "lastBooking"
}

export const mediaSchema = { 
    walkthroughVideo : "walkthroughVideo",
    images : "images"
}

export const bookingsSchema = {
    date : "date",
    bookingId : "bookingId",
    tenantName :"tenantName",
    roomType : "roomType",
    checkIn: "checkIn",
    status: "status",
    amount : "amount"
}

export const propertyInfoSchema= {
    name :"name",
    phone :"phone",
    email : "email",
    accountStatus : "accountStatus"
}