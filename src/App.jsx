import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminManagement from './pages/AdminManagement'
import Properties from './pages/Properties'
import Bookings from './pages/Bookings'
import Partner from './pages/Partner'
import Tenants from './pages/Tenants'
import Transaction from './pages/Transaction'
import Complaints from './pages/Complaints'
import Promotion from './pages/Promotion'
import Plan from './pages/Plan'
import Notification from './pages/Notification'
import Setting from './pages/Setting'
import Logout from './pages/Logout'
import Leftbar from './components/Leftbar'
import Navbar from './components/Navbar'
import AddNewAdmin from './components/AddNewAdmin';
import ManageRoles from './pages/ManageRoles';
import AddNewRole from './pages/AddNewRole';
import PropertyDetails from './pages/PropertyDetails';
import useProperties from './context/PropertiesContext';
import PropertyPopups from './components/PropertyPopups';
import PropertyFilters from './components/PropertyFilters';
import { useEffect } from 'react';
import Testing from './pages/Dummy'


const App = () => {

  const { popup } = useProperties()

  return (
    <>
      {popup.type === "block" ? (
        <PropertyPopups
          heading={"Block Property"}
          subHeading={"Are you sure you want to block this property?"}
          suretyMsg={"* Once blocked, this property will not be visible to tenants until unblocked."}
          firstButton={"Cancel"}
          secondButton={"Block Property"}
          primaryColor={"#FF0000"}
        >
          <div className='flex flex-col gap-2'>
            <p className='text-[12px] custom-poppins'>Reason of Blocking</p>
            <select
              className='h-[48px] py-[10px] px-[20px] rounded-[40px] bg-[#F9F9F9] text-[12px] text-[#838383]'
            >
              <option value="Fake or Misleading Information">Fake or Misleading Information</option>
            </select>
          </div>
        </PropertyPopups>

      ) : popup.type === "unblock" ? (
        <PropertyPopups
          heading={"Unblock Property"}
          subHeading={"Do you want to unblock this property?"}
          suretyMsg={"* This property will be visible to all users after unblocking."}
          firstButton={"Cancel"}
          secondButton={"Unblock Property"}
          primaryColor={"#00B806"}
        />

      ) : popup.type === "verify" ? (
        <PropertyPopups
          heading={"Verify Property Listing"}
          subHeading={"Are you sure you want to mark this property as verified?"}
          suretyMsg={"* This tag will indicate that the property is reviewed and trusted."}
          firstButton={"Cancel"}
          secondButton={"Verify Property"}
          primaryColor={"#0022FF"}
        />

      ) : popup.type === "delete" && (
        <PropertyPopups
          heading={"Delete Property"}
          subHeading={"Are you sure you want to permanently delete this property?"}
          suretyMsg={"* This action cannot be undone. All data and media related to this property will be removed."}
          firstButton={"Cancel"}
          secondButton={"Delete Permanently"}
          primaryColor={"#FF0000"}
        >
          <div className='flex flex-col gap-2'>
            <p className='text-[12px] custom-poppins'>Reason of Deletion</p>
            <select
              className='h-[48px] py-[10px] px-[20px] rounded-[40px] bg-[#F9F9F9] text-[12px] text-[#838383]'
            >
              <option value="Fake or Misleading Information">Violation of Platform Policies</option>
            </select>
          </div>
        </PropertyPopups>
      )}


      <div className="bg-[#F9F9F9] h-screen p-5 gap-5 flex lg:p-[20px] overflow-hidden">
        <Leftbar />
        <AddNewAdmin />
        <PropertyFilters/>

        <div className='flex-1 flex flex-col gap-[20px] min-w-0 '>
          <Navbar />
          <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin-management" element={<AdminManagement />} />
              <Route path="/admin-management/manage-roles" element={<ManageRoles />} />
              <Route path="/admin-management/add-new-role" element={<AddNewRole />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:propertyId" element={<PropertyDetails />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/promotion" element={<Promotion />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/testing" element={<Testing />} />
            </Routes>

          </main>
        </div>
      </div>
    </>
  )
}

export default App
