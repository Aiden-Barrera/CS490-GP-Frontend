import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import App from './App.jsx'
import Exercise from "./pages/Exercise"
import PharmacySideBarMenu from './pages/PharmacistPortal/PharmaSideBarMenu.jsx'
import PillInfo from "./components/PillInfo"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <PillInfo />
    </Router>
  </StrictMode>,
)
