import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage';
import ServicePage from '../Pages/ServicesPage'
import ServiceDetailsPage from '../Pages/ServiceDetailsPage'
import About from '../Pages/About';
import Contact from '../Pages/Contact';


const AllRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/services/:category" element={<ServicePage />} />
      <Route path='/services/:category/:serviceCategory' element={<ServicePage />} />
      <Route path="/services/details/:id" element={<ServiceDetailsPage />} />
      {/* <Route path='*' element={<PageUnderConstruction />} /> */}
    </Routes>
  )
}

export default AllRoute