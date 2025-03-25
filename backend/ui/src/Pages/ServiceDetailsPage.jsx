import React, { useState , useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import "./ServiceDetailsPage.css"; // Consider renaming this file to "Ticket.css" for better clarity
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPhone , FaWhatsapp } from 'react-icons/fa';
// import { useSelector , useDispatch } from 'react-redux';
// import { addBooking } from '../../Redux/Booking/action';
// import VoiceInput from '../../Components/VoiceInput';

const ServiceDetailsPage = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  const [data , setData] = useState([])
  // const token =useSelector((store)=>store.authReducer.token);
  // const token ="Ali"

  // const user = JSON.parse(localStorage.getItem("user"));
// console.log("user", user)
// const dispatch=useDispatch();
// const toast=useToast();


const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  address: '',
  message: ''
});


const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
};


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

const handleAddBooking = (category, serviceProvider, providerWhatsapp, providerContact) => {
  const currentDate = new Date();
  const formattedTime = formatAMPM(currentDate);
  let userPhoneNumber = localStorage.getItem("userPhoneNumber") || "";

    let payload = {
      category,
      serviceProvider,
      providerWhatsapp,
      providerContact,
      phone:userPhoneNumber,
      bookingTime: currentDate.toLocaleDateString() + ' ' + formattedTime,
      contacted: false
    };
  axios.post("https://sabreserve.com/bookings/add", payload).then((res) => {
    console.log('res', res);
  }).catch((err) => {
    console.log("err", err);
  });
};
  const goBack = () => {
    // Use navigate(-1) to go back
    navigate(-1);
  };

  const handleSubmit =(event) => {
    event.preventDefault();
   
        
    const currentDate = new Date();
    const formattedTime = formatAMPM(currentDate);
  
    let payload = {
      name:formData.name,
      phone:formData.phone,
      message:formData.message,
      category:data.category,
      serviceProvider:data.serviceProvider,
      providerWhatsapp:data.providerWhatsapp,
      providerContact:data.providerContact,
      bookingTime: currentDate.toLocaleDateString() + ' ' + formattedTime,
      contacted: false
    };
    axios.post("https://sabreserve.com/bookings/add", payload).then((res) => {
      console.log('res', res);
    }).catch((err) => {
      console.log("err", err);
    });


  };

  useEffect(()=>{
    axios.get(`https://sabreserve.com/services/${id}`).then((res)=>{
 setData(res.data)
    })
 },[])


  const handleInputChange = (value) => {
    formData.message=value
    // console.log('Updated message:', value); // Example usage of the value
  };

  return (
    <div className="cake-page">  {/* Consider renaming to "tailoring-page" for clarity */}
      {/* Carousel */}
    <div className="left">
    <div className="cake-images">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          <div>
            <img src={data.image} alt={data.image} />
            {/* <img
            src="httpss://content.jdmagicbox.com/comp/ballia/z1/9999p5494.5494.140430123101.z5z1/catalogue/railway-ticket-booking-centre-maniar-ballia-84rtd.jpeg"
              alt="Ticket Booking"
            /> */}
          </div>
          {/* <div>
            <img
            src="httpss://media.istockphoto.com/id/1263019595/photo/textile-industry-workers.jpg?s=612x612&w=0&k=20&c=iXReGdK-g2UvJ-Z1wCgovn2M2v0GVoB_PphDL1idLJw="
              alt="Tailored Dress"
            />
          </div>
          <div>
            <img
            src="data:image/jpeg;base64,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"
              alt="Tailored Shirt"
            />
          </div> */}
          {/* Add more tailoring work images here as needed */}
        </Carousel>
        
      </div>
      <div className="buttons">
              <div
                onClick={() => handleAddBooking(data.category, data.serviceProvider, data.whatsappNumber, data.contactNumber)}
                className="call-button"
              >
                <a href={`tel:${data.contactNumber}`}>
                  <FaPhone /> Call
                </a>
              </div>
              <div
                onClick={() => handleAddBooking(data.category, data.serviceProvider, data.whatsappNumber, data.contactNumber)}
                className="whatsapp-button"
              >
                <a href={`https://wa.me/${data.whatsappNumber}`}>
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </div>
    </div>

      {/* Content */}
      <div className="right">
  {data && (
    <div className="cake-details">
      <h2 style={{ textAlign: "center" }}>{data.title}</h2>
      <p style={{ textAlign: "center" }}>{data.description}</p>
      <p><strong>City:</strong> {data.city}</p>
      <p><strong>Pincode:</strong> {data.pincode}</p>

      {/* Check if data.details is defined and is an array */}
      <p>
        <strong>Details:</strong>
        <br />
        {data.details && Array.isArray(data.details) && data.details.length > 0 ? (
          data.details.map((detail, index) => {
            const trimmedDetail = detail.trim();
            const firstSpaceIndex = trimmedDetail.indexOf(" ");
            const firstWord = firstSpaceIndex !== -1 ? trimmedDetail.slice(0, firstSpaceIndex) : trimmedDetail;
            const restOfDetail = firstSpaceIndex !== -1 ? trimmedDetail.slice(firstSpaceIndex) : "";

            return (
              <span key={index}>
                <strong>{firstWord}</strong>{restOfDetail && ` - ${restOfDetail}`}
                {index < data.details.length - 1 && <br />}
              </span>
            );
          })
        ) : (
          <span>No details available.</span>
        )}
      </p>
    </div>
  )}
</div>



    </div>
  );
};

export default ServiceDetailsPage;
