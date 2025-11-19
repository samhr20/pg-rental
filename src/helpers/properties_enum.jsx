export const partnerInfoSchema = {
    Properties: "Properties",
    account_status: "account_status",
    created_at: "created_at",
    email: "email",
    id: "id",
    name: "name",
    phone: "phone",
}

export const PropertiesSchema = {
    Amenties: "Amenties",
    Location: "Location",
    Rent: "Rent",
    StatusControls: "StatusControls",
    created_at: "created_at",
    furnishing: "furnishing",
    gender_prefrence: "gender_prefrence",
    id: "id",
    images: "images",
    pg_id: "pg_id",
    title: "title",
    type: "type",
    video: "video"
}
export const AmentiesSchema = {
    ac: "ac",
    created_at: "created_at",
    id: "id",
    laundry: "laundry",
    pg_id: "pg_id",
    wifi: "wifi"
}

export const LocationSchema = {
    address: "address",
    city: "city",
    created_at: "created_at",
    id: "id",
    locality: "locality",
    pg_id: "pg_id"
}

export const rentSchema = {
    created_at: "created_at",
    id: "id",
    pg_id: "pg_id",
    room_types: "room_types"
}
export const roomTypesSchema = {
    price: "price",
    type: "type"
}

export const statusControlsSchema = {
    active : "active",
    blockReason : "blockReason",
    created_at  :"created_at",
    id : "id",
    isBlocked  :"isBlocked",
    isDeleted : "isDeleted",
    isVerified  : "isVerified",
    pg_id  : "pg_id",

}

