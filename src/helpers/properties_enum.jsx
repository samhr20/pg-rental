export const propertySchema = {
    propertyName: "propertyName",
    active: "active",
    propertyId: "propertyId",
    listedOn: "listedOn",
    statusControls: "statusControls",
    locationDetails: "locationDetails",
    partnerInfo: "partnerInfo",
    propertyTypeStructure: "propertyTypeStructure",
    amenities: "amenities",
    rentAndPrice: "rentAndPrice",
    engagementMetrics: "engagementMetrics",
    photosAndMedia: "photosAndMedia",
    bookingHistory: "bookingHistory"
}

export const statusControlsSchema = {
    isBlocked: "isBlocked",
    isVerified: "isVerified",
    isDeleted: "isDeleted",
    blockReason: "blockReason"
}
export const locationDetailsSchema = {
    city: "city",
    address: "address"
}

export const partnerInfoSchema = {
    name: "name",
    phone: "phone",
    email: "email",
    accountStatus: "accountStatus"
}

export const propertyTypeStructureSchema = {
    type: "type",
    roomsAvailable: "roomsAvailable",
    genderPreference: "genderPreference",
    furnishing: "furnishing"
}

export const amenitiesSchema = {
    wifi: "wifi",
    parking: "parking",
    laundry: "laundry",
    security: "security"
}

export const rentAndPriceSchema = {
    privateRoom: "privateRoom",
    doubleSharing: "doubleSharing",
    tripleSharing: "tripleSharing"
}

export const engagementMetricsSchema = {
    totalViews: "totalViews",
    totalInquiries: "totalInquiries",
    lastBooking: "lastBooking"
}

export const photosAndMediaSchema = {
    walkthroughVideo: "walkthroughVideo",
    images: "images"
}

export const bookingHistorySchema = {
    date: "date",
    bookingId: "bookingId",
    tenantName: "tenantName",
    roomType: "roomType",
    checkIn: "checkIn",
    status: "status",
    amount: "amount"
}