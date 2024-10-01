import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("jaipur");
  const [thisLocation, setLocation] = useState("");

  // fetch api
  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        contentType: "csv",
        unitGroup: "us",
        aggregateHours: "24",
        location: "Washington,DC,USA",
        shortColumnNames: "false",
      },
      headers: {
        "x-rapidapi-key": "89d2f15a91msh47f4c83bf93adabp186a25jsn2804a03885c7",
        "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const thisData = Object.values(response.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
        alert(`Error: ${error.response.data.message}`); // Show the specific error message
      } else {
        alert("An error occurred while fetching the weather data.");
      }
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
