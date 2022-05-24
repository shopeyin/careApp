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
