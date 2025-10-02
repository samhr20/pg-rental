import { Routes, Route } from 'react-router-dom';
import Leftbar from "@/components/Leftbar";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import AdminManagement from './components/AdminManagement';
import Properties from './components/Properties';
import Bookings from './components/Bookings';
import Partner from './components/Partner'
import Tenants from './components/Tenants'
import Transaction from './components/Transaction'
import Complaints from './components/Complaints'
import Promotion from './components/Promotion'
import Plan from './components/Plan'
import Notification from './components/Notification'
import Setting from './components/Setting'
import Logout from './components/Logout'

const App = () => {
  return (
    <div className="bg-[#F9F9F9] h-screen flex p-[20px] ">
      <Leftbar />
      <div className='flex-grow px-6'>
        <Navbar />
        <main className="">
          <Routes>
            <Route path="/" element={<Dashboard  />} />
            <Route path="/admin-management" element={<AdminManagement />} />
            <Route path="/properties" element={<Properties/>} />
            <Route path="/bookings" element={<Bookings/>} />
            <Route path="/partner" element={<Partner/>} />
            <Route path="/tenants" element={<Tenants/>} />
            <Route path="/transaction" element={<Transaction/>} />
            <Route path="/complaints" element={<Complaints/>} />
            <Route path="/promotion" element={<Promotion/>} />
            <Route path="/plan" element={<Plan/>} />
            <Route path="/notification" element={<Notification/>} />
            <Route path="/setting" element={<Setting/>} />
            <Route path="/logout" element={<Logout/>} />
          </Routes>

        </main>
      </div>
    </div>
  )
}

export default App