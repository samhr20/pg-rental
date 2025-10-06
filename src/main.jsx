import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { SideBarProvider } from './context/SideBarContext.jsx';
import { DashboardDataProvider } from './context/DashboardDataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DashboardDataProvider>
        <SideBarProvider>
          <App />
        </SideBarProvider>
      </DashboardDataProvider>
    </BrowserRouter>
  </StrictMode>,
)
