import React, { useState } from "react";
import useNewAdmin from "../context/AddNewAdminContext";

const AddNewAdmin = () => {
  const { newAdminOpen, adminToggle } = useNewAdmin();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-200 ${newAdminOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => {
          adminToggle()
          setImagePreview(null)
        }}
      />

      {/* Right Drawer */}
      <div
        className={`fixed top-0 right-0 z-60 w-[350px] h-full rounded-tl-[30px] rounded-bl-[30px] px-[30px] pt-[30px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col gap-[20px] ${newAdminOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Heading */}
        <h5 className="text-[18px]  text-[#FF6A00]">Add New Admin</h5>

        {/* Section */}
        <div className="flex flex-col gap-5 overflow-y-auto ">
          <p className="text-[14px] font-medium text-gray-700">
            Basic Information
          </p>

          <form className="flex flex-col gap-5 ">
            {/* Profile Upload Box */}
            <div className="w-full max-w-[290px] h-[80px] bg-[#FFF5EE] border border-dashed border-[#FF7A00] rounded-[10px] flex flex-col justify-center items-center text-center p-[14px] cursor-pointer hover:bg-[#fff0e0] transition ">
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-full h-full gap-1.5 cursor-pointer"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                ) : (
                  <>
                    <h5 className="text-[#FF7A00] font-medium text-[12px] underline">
                      Profile Photo
                    </h5>
                    <p className="text-[#838383] text-[9px] leading-tight">
                      Upload image in JPG, JPEG, or PNG format.
                    </p>
                    <p className="text-[#838383] text-[9px]">
                      Max file size: 2 MB | Max allowed: 10 Images
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
              />
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] custom-poppins ">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="customInput"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] custom-poppins">
                Email Address
              </label>
              <input
                type="email"
                placeholder="role@example.com"
                className="customInput"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] custom-poppins">
                Phone Number
              </label>
              <input type="tel" placeholder="+91" className="customInput" />
            </div>

            {/* Role & Permission */}
            <p className="text-[14px] ">Role & Permission</p>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] custom-poppins">
                  Select Role
                </label>
                <select className="w-full max-w-[290px] h-[48px] rounded-[40px] border border-gray-300 text-[#838383] px-4 text-[12px] outline-none transition  bg-[#F9F9F9] custom-poppins cursor-pointer">
                  <option>Super Admin</option>
                  <option>Operation Manager</option>
                  <option>Property Auditor</option>
                  <option>Marketing Manager</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-5 mt-3">
              <button
                type="button"
                className="w-full max-w-[290px] h-[35px] rounded-[30px] border border-[#FF6A00] text-[#FF6A00]
                custom-medium text-[14px]  hover:bg-[#fff1e8] transition cursor-pointer"
                onClick={() => {
                  adminToggle()
                  setImagePreview(null)
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full max-w-[290px] custom-poppins   h-[35px] rounded-[30px] bg-[#FF6A00] text-white text-[14px]  hover:bg-[#ff8c32] transition cursor-pointer"
              >
                Save Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewAdmin;