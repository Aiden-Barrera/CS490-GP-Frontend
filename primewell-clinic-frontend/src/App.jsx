import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Posts from './pages/Posts'
import Reviews from './pages/Reviews'
import Navbar from './components/Navbar'
import PatientPortal from './pages/PatientPortal'
import DoctorPortal from './pages/DoctorPortal'
import PharmacistPortal from './pages/PharmacistPortal'

function App() {
  const [userInfo, setUserInfo] = useState([]) // This will store the user Info for future queries
  useEffect(() => {
    document.title = "PrimeWell Clinic"
  }, [])

  useEffect(() => { // This is to just verify their info is being stored
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
          <Route path='/PatientPortal' element={<PatientPortal />}/>
          <Route path='/DoctorPortal' element={<DoctorPortal />}/>
          <Route path='/PharmacistPortal' element={<PharmacistPortal />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
