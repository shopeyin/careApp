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

export const fetchVisit = async (currentUserId, visitDate) => {
  console.log(axios);
  try {
    const visitData = await axios.post(
      `${BASE_URL}/visit/${currentUserId}`,
      visitDate
    );
    const {
      data: {
        data: { visit },
      },
    } = visitData;

    console.log(visit);
    return visit;
  } catch (err) {
    return err;
  }
};
