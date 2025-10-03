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

const App = () => {
  return (
    <div className="bg-[#F9F9F9]  flex lg:p-[20px] ">
      <Leftbar />
      <div className='w-full lg:px-6 p-5 '>
        <Navbar  />
        <main className="">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
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