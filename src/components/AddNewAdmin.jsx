import React, { useEffect, useState } from "react";
import useNewAdmin from "../context/AddNewAdminContext";
import { data, useNavigate } from 'react-router-dom';
import axios from "axios";
import useData from "../context/DataFetchContext";
import { newAdminSchema, rolesSchema } from "../helpers/user_enum";

const AddNewAdmin = () => {
  const { newAdminOpen, adminToggle } = useNewAdmin();
  const { adminData, setAdminData, allRoles } = useData()
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();


    const generateNewId = () => {
      if (adminData.length === 0) {
        return "P10231";
      }

      const lastAdmin = adminData[adminData.length - 1];
      const lastIdNumber = parseInt(lastAdmin.AdminId.substring(1));
      const newIdNumber = lastIdNumber + 1;
      return `P${newIdNumber}`;
    };


    const newAdmin = {}
    newAdmin[newAdminSchema.AdminId] = generateNewId();
    newAdmin[newAdminSchema.FullName] = fullName;
    newAdmin[newAdminSchema.AdminPhone] = mobileNumber;
    newAdmin[newAdminSchema.AdminMail] = email;
    newAdmin[newAdminSchema.Image] = image;
    newAdmin[newAdminSchema.Role] = role;
    newAdmin[newAdminSchema.LastLogin] = "Just Now";
    newAdmin[newAdminSchema.Status] = true



    try {
      const res = await axios.post('http://localhost:3000/AdminData', newAdmin)
      setAdminData([...adminData, res.data])
      cancelButton()
      navigate('/admin-management')

    } catch (error) {
      console.error(error);

    }

  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const cancelButton = () => {
    adminToggle()
    setImage(null)
    setFullName('')
    setEmail('')
    setMobileNumber('')
    setRole('')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-200 ${newAdminOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={cancelButton}
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

          <form onSubmit={submitHandler} className="flex flex-col gap-5 ">
            {/* Profile Upload Box */}
            <div className="w-full max-w-[290px] h-[80px] bg-[#FFF5EE] border border-dashed border-[#FF7A00] rounded-[10px] flex flex-col justify-center items-center text-center p-[14px] cursor-pointer hover:bg-[#fff0e0] transition ">
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-full h-full gap-1.5 cursor-pointer"
              >
                {image ? (
                  <img
                    src={image}
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
                required
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] custom-poppins">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91"
                className="customInput"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            {/* Role & Permission */}
            <p className="text-[14px] ">Role & Permission</p>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] custom-poppins">
                  Select Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full max-w-[290px] h-[48px] rounded-[40px] border border-gray-300 text-[#838383] px-4 text-[12px] outline-none transition bg-[#F9F9F9] custom-poppins cursor-pointer"
                >
                  <option value="">Select Role</option>
                  {allRoles && allRoles.length > 0 ? (
                    allRoles.map((item) => (
                      <option key={item[rolesSchema.id]} value={item[rolesSchema.role]}>
                        {item[rolesSchema.role]}
                      </option>
                    ))
                  ) : (
                    <option disabled>No roles available</option>
                  )}
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-5 mt-3">
              <button
                type="button"
                className="w-full max-w-[290px] h-[35px] rounded-[30px] border border-[#FF6A00] text-[#FF6A00]
                custom-medium text-[14px]  hover:bg-[#fff1e8] transition cursor-pointer"
                onClick={cancelButton}
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