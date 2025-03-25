import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import axios from "axios";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [location, setLocation] = useState(localStorage.getItem("city")||'');
  const [serviceCategory, setServiceCategory] = useState('');
  const [allCategories , setAllCategories] = useState([])
  const [filteredServices, setFilteredServices] = useState([]);
  const [city, setCity] = useState('');
  const qlocation = useLocation();
  const searchParams = new URLSearchParams(qlocation.search);

  let category = searchParams.get('category'); 

   const mainCategories = [
    "Real Estate", "Electrician", "Travel",
    "AC Repair","Clear"
  ];

  const handleCategoryClick = (category) => {
    if(category === "Clear"){
      setServiceCategory("")
    }else{
      setServiceCategory(category);
    }
  };

  const getLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityName(latitude, longitude).then((cityName) => {
            setCity(cityName);
            setLocation(cityName);
            localStorage.setItem("city", cityName);
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Location access is required for better service recommendations.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getCityName = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

    try {
      const response = await axios.get(url);
      const address = response.data.address;

      if (address && address.city) {
        return address.city;
      } else if (address && address.town) {
        return address.town;
      } else if (address && address.village) {
        return address.village;
      } else {
        return 'City not found';
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
      return 'Error fetching city name';
    }
  };

  const handleClearLocation = () => {
    localStorage.removeItem("city");
    setLocation('');
    setCity('');
  };

  const getServiceByLocation =(location)=>{
    axios.get(`https://sabreserve.com/services/all?category=${category}&location=${location}`)
    .then((res) => {
      setServices(res.data);
      setFilteredServices(res.data);
      let sc =[]
      res.data.length > 0 && res.data.forEach((el) =>{
        sc.push(el.serviceCategory)
      })
      setAllCategories(sc)
      console.log("serviceCategory" , sc)
    })
    .catch((err) => {
      console.log("err", err);
    });
  }

  useEffect(() => {
    // axios.get("https://sabreserve.com/services/all")
    axios.get(`https://sabreserve.com/services/all?category=${category}&location=${location}`)
      .then((res) => {
        setServices(res.data);
        setFilteredServices(res.data);
        let sc =[]
        res.data.length > 0 && res.data.forEach((el) =>{
          sc.push(el.serviceCategory)
        })
        setAllCategories(sc)
        console.log("serviceCategory" , sc)
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const filterServices = useCallback(() => {
    let filtered = services;

    function normalizeString(str) {
      return str.toLowerCase().replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
    }

    if (location) {
      const normalizedLocation = normalizeString(location);
      filtered = filtered.filter(service =>
        service.combinedAddress &&
        normalizeString(service.combinedAddress).includes(normalizedLocation)
      );
    }

    if (serviceCategory) {
      const normalizedCategory = normalizeString(serviceCategory);

      filtered = filtered.filter(service =>
        normalizeString(service.serviceCategory) === normalizedCategory
      );

    }

    setFilteredServices(filtered);
  }, [location, serviceCategory, services]);

  useEffect(() => {
    filterServices();
  }, [location, serviceCategory, services, filterServices]);

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const handleAddBooking = (serviceCategory, serviceProvider, providerWhatsapp, providerContact) => {
    const currentDate = new Date();
    const formattedTime = formatAMPM(currentDate);
    let userPhoneNumber = localStorage.getItem("userPhoneNumber") || "";

    let payload = {
      category:serviceCategory,
      serviceProvider,
      providerWhatsapp,
      providerContact,
      phone:userPhoneNumber,
      bookingTime: currentDate.toLocaleDateString() + ' ' + formattedTime,
      contacted: false
    };

    axios.post("https://sabreserve.com/bookings/add", payload)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="services-page">
      <h2>Our Services</h2>
      {/* <div className="category-tags">
        {mainCategories.map((cat, index) => (
       <button
       key={index}
       className={`category-tag ${serviceCategory === cat ? 'active' : ''} ${cat === 'Clear' ? 'clear-tag' : ''}`}
       onClick={() => handleCategoryClick(cat)}
     >
       {cat}
     </button>
     
        ))}
      </div> */}

      <div className="filter-section">
         <div className="searchByLocation" style={{width:"100%",display:"flex"}}>
         <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={()=>getServiceByLocation(location)}>Search</button>
         </div>
      <select value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)}>
  <option value="">Select Category</option>
  {allCategories.map((cat, index) => (
    <option key={index} value={cat}>{cat}</option>
  ))}
</select>
        <div className="filter-location-buttons">
        <button className="location-button" onClick={getLocationPermission}>
          Select Location
        </button>
        <button className="clear-button" onClick={handleClearLocation}>
          Clear Location
        </button>
        </div>
      </div>

      {!location && (
        <div className="no-location">
          <p>Please search or select a location.</p>
        </div>
      )}

     
      <div className="serviceCardContainer">
        {filteredServices && filteredServices.map((el , i) => (
           <div key={i} className="glassCard">
            <div>
              <img src={el.image} alt="" />
            </div>
           <h2>{el.title}</h2>
           <p>{el.description}</p>
           <div className="glassButtons">
           <div
                onClick={() => handleAddBooking(el.category, el.serviceProvider, el.whatsappNumber, el.contactNumber)}
                className="whatsapp-button"
              >
                <a href={`https://wa.me/${el.whatsappNumber}`}>
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
             {/* <button>Instagram</button> */}
           <Link to={`/services/details/${el._id}`} className="view-details">View Details</Link>

             <button>Request Callback</button>
           </div>

         </div>
        ))}
      </div>
      {
      filteredServices.length === 0 && 
      <div>
        <p>No results found !!</p>
      </div>
      }
    </div>
  );
};

export default ServicePage;
