import axios from "axios";
const URL = "http://127.0.0.1:1000/api/v1/task";

export const addTaskToUser = async (serviceuserId, data) => {
  try {
    await axios.post(`${URL}/${serviceuserId}`, data);
    console.log("ASYNC submitted");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllTaskofaServiceUser = async (serviceuserId) => {
  try {
    const serviceUserData = await axios.get(`${URL}/${serviceuserId}`);
    const {
      data: { data },
    } = serviceUserData;
    return data.task.tasks;
  } catch (error) {
    console.log(error);
  }
};


export const handleDeleteTask = async (id) => {
  try {
    await axios.delete(`${URL}/${id}`);
   
  } catch (error) {
    console.log(error);
  }
};


