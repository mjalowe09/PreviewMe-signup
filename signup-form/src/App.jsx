//libraries
import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
//stylesheets
import './App.css'
//pages
import Navbar from './components/Navbar'
import SignupForm from './pages/SignupForm'
import SignupSucess from './pages/SignupSucess'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<SignupForm />} exact />
      <Route path='/signup-success' element={<SignupSucess/>} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
