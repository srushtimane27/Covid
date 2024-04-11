import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    console.log(selectedCountry,"selectedCountry")
    const [covidData, setCovidData] = useState({});

    const options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/countries',
      headers: {
        'X-RapidAPI-Key': '82af082083mshf57355bad330b86p10f0acjsn20fe2f2ffd7e',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };

    async function getCountries(){
        try {
            const response = await axios.request(options);
            console.log(response.data.response)
            setCountries(response.data.response);
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(event){
      setSelectedCountry(event.target.value);
    }

    async function fetchData(){
      const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params:{
          country: selectedCountry
        },
        headers: {
          'X-RapidAPI-Key': '82af082083mshf57355bad330b86p10f0acjsn20fe2f2ffd7e',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data)
        setCovidData(response.data.response[0]);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
        getCountries();
    },[]);

    return (
        <div className=''>
            <label>Select Country</label>
            <select onChange={handleChange} value={selectedCountry}>
                <option value="">Select a country</option>
                {countries.map((country, index)=>(
                    <option value={country} key={index}>{country}</option>
                ))}
            </select>
            <br/>
            <button onClick={fetchData}>Get Data</button>
            {covidData && (
                <div>
                    <p>Continent: {covidData.continent}</p>
                    <p>Population: {covidData.population}</p>
                    <p>Day: {covidData.day}</p>
                    {/* <p>tests: {covidData.tests.total}</p> */}
                </div>
            )}
        </div>
    );
}

export default App;
