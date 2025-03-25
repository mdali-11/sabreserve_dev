import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhoneNumberModal.css';

const countryCodes = [
  { code: '+91', country: 'India 🇮🇳' },
  { code: '+1', country: 'USA 🇺🇸' },
  { code: '+44', country: 'UK 🇬🇧' },
  { code: '+61', country: 'Australia 🇦🇺' },
  { code: '+81', country: 'Japan 🇯🇵' },
];

const PhoneNumberModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCode, setSelectedCode] = useState('+91'); // Default India

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
    if (!storedPhoneNumber) {
      setIsModalOpen(true);
    }
  }, []);

  const handleSavePhoneNumber = () => {
    if (phoneNumber.trim().length !== 10 || !/^\d+$/.test(phoneNumber)) {
      // alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const fullPhoneNumber = `${selectedCode}${phoneNumber.trim()}`;
    axios.post("https://sabreserve.com/user/save-phone", {phoneNumber:fullPhoneNumber})
      .then((res) => {
        console.log('res', res);
      localStorage.setItem('userPhoneNumber', fullPhoneNumber);
      setIsModalOpen(false)
      })
      .catch((err) => {
        console.log("err", err);
      });
   
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Enter Your Phone Number</h3>
            <div className="phone-input-container">
              <select
                className="country-code-dropdown"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
              >
                {countryCodes.map((item) => (
                  <option key={item.code} value={item.code}>
                    ({item.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                maxLength="10"
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ''))} // Only allow numbers
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleSavePhoneNumber} className="save-button">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="close-button">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhoneNumberModal;
