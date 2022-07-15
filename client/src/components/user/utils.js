import axios from "axios";
const URL = "http://127.0.0.1:1000/api/v1/visitInformation/";

export const addVisitInfo = async (data) => {
  try {
    await axios.post(`${URL}`, data);
    console.log("submitted");
  } catch (error) {
    console.log(error);
  }
};

export const getCarerLocation = () => {
  const coords = navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("LAT", position.coords.latitude);
      console.log("LONG", position.coords.longitude);
      // const a = {
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude,
      // };
      // const b = { latitude:55.92356, longitude: -3.289782 };
      // console.log("CALC", haversine(a, b));
    },
    (error) => {
      console.log(error.message);
    },
    {
      enableHighAccuracy: true,
    }
  );
return coords
};

