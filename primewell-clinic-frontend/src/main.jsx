<<<<<<< HEAD
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
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
>>>>>>> ff30fb7c413ed977e5c2e97a84e3f9d6b642152a
