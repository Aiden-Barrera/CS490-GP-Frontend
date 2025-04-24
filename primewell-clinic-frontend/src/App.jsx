import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Flex } from 'antd'
import './App.css'
import Home from './pages/Home'
import Posts from './pages/Posts'
import Reviews from './pages/Reviews'
import Navbar from './components/Navbar'
import SideBarMenu from './pages/PatientPortal/SideBarMenu'
import PharmacistPortal from './pages/PharmacistPortal/PharmacistPortal'
import Dashboard from './pages/PatientPortal/Dashboard'
import Request from './pages/PatientPortal/Request'
import DoctorSideBarMenu from './pages/DoctorPortal/DoctorSideBarMenu'
import DoctorDashboard from './pages/DoctorPortal/DoctorDashboard'
import DoctorIncomingRequests from "./pages/DoctorPortal/DoctorIncomingRequests";
import DoctorPillRequest from './pages/DoctorPortal/DoctorPillRequest'
import Exercise from './pages/Exercise'
import ReviewDetail from './components/ReviewDetail'
import DailySurvey from './pages/PatientPortal/DailySurvey'
import Profile from './pages/Profile'
import PharmaSideBarMenu from './pages/PharmacistPortal/PharmaSideBarMenu'
import PillPage from './pages/PharmacistPortal/PillPage'
import Appointments from './pages/PatientPortal/Appointments'
import Regiment from './pages/PatientPortal/Regiment'
import ApptChannel from './pages/ApptChannel'
import DoctorFeedback from './pages/DoctorPortal/DoctorFeedback'

function App() {
  const [userInfo, setUserInfo] = useState([]) // This will store the user Info for future queries
  const [surveyCompleted, setSurveyCompleted] = useState(false); // shared state
  const [headers, setHeaders] = useState(JSON.parse(import.meta.env.VITE_HEADERS))
  const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);

  useEffect(() => {
    document.title = "PrimeWell Clinic";
  }, []);

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem("userInfo")
    const storedAuth = sessionStorage.getItem("auth")

    if (storedUserInfo && storedAuth === "true"){
      setUserInfo(JSON.parse(storedUserInfo))
      console.log("Stored UserInfo: ", JSON.parse(storedUserInfo))
    }
    setIsUserInfoLoaded(true)
  }, [])

  if (!isUserInfoLoaded) return <Flex justify='center' align='center' style={{color: "#ffffff", width: "100vw", fontSize: "48px"}}>Loading...</Flex>;

  return (
    <>
      <div className='App'>
        <Navbar userInfo={userInfo} info={setUserInfo} />
        <Routes>
          <Route path='/' element={<Home headers={headers}/>}/>
          <Route path='/Posts' element={<Posts info={userInfo}/>}/>
          <Route path='/PharmacistPortal' element={<PharmacistPortal />}/>
          <Route path='/Exercise' element={<Exercise info={userInfo}/>} />
          <Route path='/viewProfile' element={<Profile userInfo={userInfo}/>} />
          {/* Patient Portal with Nested Routes */}
          <Route path="/PatientPortal" element={<SideBarMenu info={userInfo} surveyCompleted={surveyCompleted} />}>
            <Route index element={<Dashboard info={userInfo} />} />
            <Route path="Request" element={<Request userInfo={userInfo} />} />
            <Route path="Appointment" element={<Appointments userInfo={userInfo}/>} />
            <Route path="Regiment" element={<Regiment info={userInfo}/>} />
            <Route path="Daily-Survey" element={<DailySurvey info={userInfo} setSurveyCompleted={setSurveyCompleted}/>} />
            <Route path="Prescription" element={<div>Prescription Page</div>} />
            <Route path="Payment" element={<div>Payment Page</div>} />
            <Route path="ApptChannel" element={<ApptChannel userInfo={userInfo} />} />
          </Route>
          {/* Doctor Portal with Nested Routes */}
          <Route
            path="/DoctorPortal/"
            element={<DoctorSideBarMenu landing={true} info={userInfo} />}
          >
            <Route
              index
              element={<DoctorDashboard info={userInfo} />}
            />
            <Route
              path="/DoctorPortal/Request"
              element={<DoctorIncomingRequests info={userInfo} />}
            />
            <Route
              path="/DoctorPortal/PillRequest"
              element={<DoctorPillRequest />}
            />
            <Route 
              path="ApptChannel" 
              element={<ApptChannel userInfo={userInfo}/>} 
            />
            <Route 
              path="DoctorFeedback" 
              element={<DoctorFeedback userInfo={userInfo}/>} 
            />

          </Route>
          {/* Pharmacist Portal with Nested Routes */}
          <Route path="/PharmacistPortal/" element={<PharmaSideBarMenu info={userInfo} />}>
            <Route path="PharmacyPortal/Request" element={<div>Request</div>} />
            <Route path="PharmacyPortal/Pickups" element={<div>Pending Pick-ups Page</div>} />
            <Route index element={<PillPage info={userInfo} />} />
            <Route path="PharmacyPortal/AccountInfo" element={<div>Account Info Page</div>} />
          </Route>
          {/* Reviews with Nested Routes */}
          <Route path='/Reviews' element={<Reviews />} />
          <Route path='/Reviews/:id' element={<ReviewDetail userInfo={userInfo} />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
