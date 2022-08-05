import axios from "axios";
import { BASE_URL } from "../../App";

export const addVisitInfo = async (data) => {
  try {
    await axios.post(`${BASE_URL}/visitInformation/`, data);
    console.log("submitted");
  } catch (error) {
    console.log(error);
  }
};


