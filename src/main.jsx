import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { SideBarProvider } from './context/SideBarContext.jsx';
import { DashboardContextProvider } from './context/DashboardContext.jsx';
import { AdminManagementContextProvider } from './context/AdminManagementContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AdminManagementContextProvider>
        <DashboardContextProvider>
          <SideBarProvider>
            <App />
          </SideBarProvider>
        </DashboardContextProvider>
    </AdminManagementContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
