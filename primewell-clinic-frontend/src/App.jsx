import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Posts from './pages/Posts'
import Reviews from './pages/Reviews'
import Navbar from './components/Navbar'

function App() {
  useEffect(() => {
    document.title = "PrimeWell Clinic"
  }, [])

  return (
    <>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Posts' element={<Posts />}/>
          <Route path='/Reviews' element={<Reviews />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
