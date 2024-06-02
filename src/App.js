import React, { useState, useEffect } from "react";

const States = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => response.json())
        .then((data) => {
          setStates(data);
          setCities([]);
          setSelectedState("");
          setSelectedCity("");
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedState, selectedCountry]);

  return (
    <div>
      <h1 style={{textAlign:"center"}}>
        Select Location 
      </h1>

      <div style={{  display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row"}}>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          style={{
            padding: "0.5rem",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          style={{
            padding: "0.5rem",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">Select City</option>
          {Array.isArray(cities) && cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && selectedState && selectedCountry && (
        <h6 style={{textAlign:"center",fontSize: '1em'}}>
          You Selected   
          <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}> {selectedCity}, </span>
          <span style={{ color: 'gray', fontSize: '1em' }}> {selectedState}, </span>
          <span style={{ color: 'gray', fontSize: '1em' }}> {selectedCountry} </span>
        </h6>
      )}
    </div>
  );
};

export default States;
