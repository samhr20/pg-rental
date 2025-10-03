import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { SideBarProvider } from './context/SideBarContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <SideBarProvider>
      <App />
     </SideBarProvider>
    </BrowserRouter>
  </StrictMode>,
)
