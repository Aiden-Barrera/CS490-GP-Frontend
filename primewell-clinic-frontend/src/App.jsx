<<<<<<< HEAD
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
import DoctorPillRequest from './pages/DoctorPortal/DoctorPillRequest'
import Exercise from './pages/Exercise'
import PillPage from './pages/PharmacistPortal/PillPage'

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
          <Route path='/Exercise' element={<Exercise />} />
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
          <Route path="/DoctorPortal/" element={<DoctorSideBarMenu landing={true} info={userInfo}/>}>
            <Route path="/DoctorPortal/Dashboard" element={<DoctorDashboard info={userInfo} />} />
            <Route path="/DoctorPortal/Request" element={<div style={{color: "#000000"}}>Incoming Request Page</div>} />
            <Route path="/DoctorPortal/Appointment" element={<div>Appointments Page</div>} />
            <Route path="/DoctorPortal/PillRequest" element={<DoctorPillRequest />} />
          </Route>
          {/* Pharmacist Portal with Nested Routes */}
          <Route path="/PharmacistPortal" element={<SideBarMenu />}>
            <Route path="Dashboard" element={<div>Dashboard</div>} />
            <Route path="Request" element={<div>Request</div>} />
            <Route path="Pickups" element={<div>Pending Pick-ups Page</div>} />
            <Route path="PillPage" element={<PillPage />} />
            <Route path="AccountInfo" element={<div>Account Info Page</div>} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
=======
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
import DoctorPillRequest from './pages/DoctorPortal/DoctorPillRequest'
import Exercise from './pages/Exercise'

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
          <Route path='/Exercise' element={<Exercise />} />
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
          <Route path="/DoctorPortal/" element={<DoctorSideBarMenu landing={true} info={userInfo}/>}>
            <Route path="/DoctorPortal/Dashboard" element={<DoctorDashboard info={userInfo} />} />
            <Route path="/DoctorPortal/Request" element={<div style={{color: "#000000"}}>Incoming Request Page</div>} />
            <Route path="/DoctorPortal/Appointment" element={<div>Appointments Page</div>} />
            <Route path="/DoctorPortal/PillRequest" element={<DoctorPillRequest />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
>>>>>>> ff30fb7c413ed977e5c2e97a84e3f9d6b642152a
