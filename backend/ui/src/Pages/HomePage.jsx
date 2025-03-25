import React, { useState } from 'react';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import ServicePage from './ServicesPage';
import About from './About';
import Contact from './Contact';
import PhoneNumberModal from '../Modals/PhoneNumberModal';
import CategorySelector from '../Components/HomeComp/CategorySelector';

const HomePage = () => {

  return (
    <div className="home-page">
      <PhoneNumberModal />
      <header className="hero-section">
        <h1>Welcome</h1>
        {/* <p>Find and book local area services easily!</p> */}
        <p>
        Find trusted local services near you with SabReserve!
        </p>
      </header>
      <section className="services-overview">
        <h2>Our Services</h2>
        <CategorySelector />
        <div className="service-cards">
          <ServiceCard title="Real Estate" category="realestate" imgSrc="https://images.pexels.com/photos/3288103/pexels-photo-3288103.png?auto=compress&cs=tinysrgb&w=600" />
          <ServiceCard title="Travelling" 
            category="ticket" imgSrc="https://content.jdmagicbox.com/comp/ballia/z1/9999p5494.5494.140430123101.z5z1/catalogue/railway-ticket-booking-centre-maniar-ballia-84rtd.jpeg"
            />
          
          <ServiceCard title="Spa" category="residential" imgSrc={"https://images.pexels.com/photos/3998008/pexels-photo-3998008.jpeg?auto=compress&cs=tinysrgb&w=600"} />
          <ServiceCard title="Salon" category="residential" imgSrc="https://images.pexels.com/photos/1319462/pexels-photo-1319462.jpeg?auto=compress&cs=tinysrgb&w=600" />
          <ServiceCard title="Carpenter" category="residential" imgSrc={"https://images.pexels.com/photos/5089167/pexels-photo-5089167.jpeg?auto=compress&cs=tinysrgb&w=600"} />
          <ServiceCard title="Electrician" category="residential" imgSrc="https://images.pexels.com/photos/5691590/pexels-photo-5691590.jpeg?auto=compress&cs=tinysrgb&w=600" />
          <ServiceCard title="Vehicle Cleaner" category="residential" imgSrc="https://images.pexels.com/photos/7154640/pexels-photo-7154640.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </div>
      </section>
      <div>
      <About />
      {/* <Link to='/services' >Go to Services</Link> */}
      </div>
      {/* <div>
        <ServicePage />
      </div>
      <div>
        <Contact />
      </div> */}
    </div>
  );
};

export default HomePage;


const ServiceCard = ({ title , imgSrc , category }) => {

  const navigate=useNavigate();

  const handleNavigate=(category)=>{
       navigate(`/services?category=${category}`)
  }
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <img width="100%" src={imgSrc} alt="" />
      <p>Find the best {title} services near you.</p>
      <button onClick={()=>handleNavigate(category)}>View Services</button>
    </div>
  );
};

