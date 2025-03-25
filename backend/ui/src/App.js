import logo from './logo.svg';
import './App.css';
import Navbar from './Components/HomeComp/Navbar';
import Footer from './Components/HomeComp/Footer';
import HomePage from "./Pages/HomePage"
import ServicePage from './Pages/ServicesPage';
import ServiceDetailsPage from './Pages/ServiceDetailsPage';
import AllRoute from './Routes/AllRoute';
import { Helmet } from 'react-helmet';
import { useState , useEffect } from 'react';
import Loading from "./Components/Loading"
import axios from 'axios';

function App() {
   
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [isLoading ,setLoading] = useState(false);

  useEffect(()=>{
    if(city===""){
      getLocationPermission()
    }
  },[])

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setLoading(true);
      console.log("Request started");
      return config;
    });
  
    // Add response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setTimeout(() => {
          setLoading(false);
          console.log("Response received");
        }, 1500);
        return response;
      },
      (error) => {
        setLoading(false);
        console.log("Error in response");
        return Promise.reject(error);
      }
    );
  
    // Cleanup function to remove interceptors when component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const getLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityName(latitude, longitude).then((cityName) => {
            setCity(cityName);
            // setLocation(cityName);
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
  

  return (
    <div className="App">
      <Helmet>
        <title>Sab Reserve</title>
        <meta
      name="description"
      content="Book all kind of services online. Now Available in Belilious Road , Shibpur , Pilkhana and Bankra"
    />
      </Helmet>
      <Navbar />
      {isLoading && <Loading isLoading={isLoading}/>}
      <AllRoute />
      {/* <HomePage />
      <ServicePage />
      <ServiceDetailsPage /> */}
      <Footer />
    </div>
  );
}

export default App;
