import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Posts from './pages/Posts'
import Reviews from './pages/Reviews'
import Navbar from './components/Navbar'
import SideBarMenu from './pages/PatientPortal/SideBarMenu'
import PharmacistPortal from './pages/PharmacistPortal'
import Dashboard from './pages/PatientPortal/Dashboard'
import Request from './pages/PatientPortal/Request'
import DoctorSideBarMenu from './pages/DoctorPortal/DoctorSideBarMenu'
import DoctorDashboard from './pages/DoctorPortal/DoctorDashboard'

function App() {
  const [userInfo, setUserInfo] = useState([]) // This will store the user Info for future queries
  useEffect(() => {
    document.title = "PrimeWell Clinic"
  }, [])

  useEffect(() => { // This is to just verify their info is being stored
    console.log("UserInfo in App.jsx")
    console.log(userInfo)
  }, [userInfo])

  return (
    <>
      <div className='App'>
        <Navbar info={setUserInfo}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Posts' element={<Posts />}/>
          <Route path='/Reviews' element={<Reviews />}/>
          <Route path='/PharmacistPortal' element={<PharmacistPortal />}/>
          {/* Patient Portal with Nested Routes */}
          <Route path="/PatientPortal" element={<SideBarMenu />}>
            <Route path="Dashboard" element={<Dashboard info={userInfo} />} />
            <Route path="Request" element={<Request />} />
            <Route path="Appointment" element={<div>Appointments Page</div>} />
            <Route path="Regiment" element={<div>Regiment Page</div>} />
            <Route path="Daily-Survey" element={<div>Daily Survey Page</div>} />
            <Route path="AccountInfo" element={<div>Account Info Page</div>} />
            <Route path="Prescription" element={<div>Prescription Page</div>} />
            <Route path="Payment" element={<div>Payment Page</div>} />
          </Route>
          {/* Doctor Portal with Nested Routes */}
          <Route path="/DoctorPortal" element={<DoctorSideBarMenu />}>
            <Route path="/DoctorPortal/Dashboard" element={<DoctorDashboard info={userInfo} />} />
            <Route path="/DoctorPortal/Request" element={<div style={{color: "#000000"}}>Incoming Request Page</div>} />
            <Route path="/DoctorPortal/Appointment" element={<div>Appointments Page</div>} />
            <Route path="/DoctorPortal/PillRequest" element={<div>Regiment Page</div>} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
