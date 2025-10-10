import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { SideBarProvider } from './context/SideBarContext.jsx';
import { AddNewAdminContextProvider } from './context/AddNewAdminContext.jsx';
import { DataFetchProvider } from './context/DataFetchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DataFetchProvider>
        <SideBarProvider>
          <AddNewAdminContextProvider>
          <App />
          </AddNewAdminContextProvider>
        </SideBarProvider>
      </DataFetchProvider>
    </BrowserRouter>
  </StrictMode>,
)
