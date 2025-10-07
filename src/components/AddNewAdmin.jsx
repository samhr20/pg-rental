import React, { useEffect } from 'react'
import useNewAdmin from '../context/AddNewAdminContext'

const AddNewAdmin = () => {
  const { newAdminOpen, adminToggle } = useNewAdmin();

  useEffect(() => {
    console.log(newAdminOpen);
  }, [newAdminOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-200
        ${newAdminOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={adminToggle}
      />

      <div
        className={`fixed top-0 right-0 z-60 w-[350px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${newAdminOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <h1 className="p-6 font-medium text-black">Admin Panel</h1>
      </div>
    </>
  );
};

export default AddNewAdmin;
