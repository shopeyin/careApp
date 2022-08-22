// import React, { useEffect, useState } from "react";

// import { useNavigate, Link } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import { format } from "date-fns";
// import { connect, useSelector } from "react-redux";
// import { BASE_URL } from "../../../App";
// import CarerVisits from "../carervisits/CarerVisits";
// import "./carerpage.style.scss";
// import axios from "axios";

// function CarerPage() {
//   const currentUser = useSelector((state) => state.user.currentUser);

//   const [serviceUsersVisit, setServiceUsersVisit] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   let navigate = useNavigate();

//   useEffect(() => {
//     let mounted = true;

//     if (currentUser.role === "admin") {
//       navigate("/admin");
//     }

//     let visitDate = {
//       dateOfVisit:
//         format(new Date(selectedDate), "yyyy-MM-dd") + "T00:00:00.000+00:00",
//     };

//     const fetchVisit = async () => {
//       try {
//         const visitData = await axios.post(
//           `${BASE_URL}/visit/${currentUser._id}`,
//           visitDate
//         );
//         const {
//           data: {
//             data: { visit },
//           },
//         } = visitData;
//         if (mounted) {
//           localStorage.setItem("visitId", visit[0]._id);

//           setServiceUsersVisit(visit[0].serviceusersToVisit);
//         }
//       } catch (err) {
//         setServiceUsersVisit([]);
//         console.log(err.message);
//       }
//     };

//     fetchVisit();

//     return () => {
//       mounted = false;
//     };
//   }, [currentUser, navigate, selectedDate]);

//   return <CarerVisits />;

// let itemsToRender;
// if (serviceUsersVisit) {
//   itemsToRender = serviceUsersVisit.map((serviceUser) => {
//     return (
//       <div
//         className="row mt-3 pl-4 pr-4 d-flex  justify-content-center"
//         key={serviceUser._id}
//       >
//         <div className="col-8 col-sm-5 col-md-4 col-lg-3">
//           <Link to={`activities/${serviceUser._id}`} className="link-color">
//             <div className="card ">
//               <div className="card-body ">
//                 <h4 className="card-title link-color"> {serviceUser.name}</h4>

//                 <h6 className="card-text link-color ">
//                   {serviceUser.address}
//                 </h6>
//               </div>
//             </div>
//           </Link>{" "}
//         </div>
//       </div>
//     );
//   });
// }

// return (
//   <div className="container-fluid p-0 ">
//     <div className="row  d-flex  justify-content-center mt-4 ">
//       <div className="col-8 col-sm-4  text-center">
//         {" "}
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="yyyy/MM/dd"
//           minDate={new Date()}
//           showYearDropdown
//           scrollableMonthYearDropdown
//         />
//       </div>
//     </div>
//     {serviceUsersVisit && serviceUsersVisit.length ? (
//       itemsToRender
//     ) : (
//       <div className="row mt-3 d-flex  justify-content-center">
//         <div className="col-8 col-sm-4 ">
//           <div className="card">
//             <div className="card-body text-center">
//               No visit on {format(new Date(selectedDate), "yyyy-MM-dd")}
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );
//}

import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import CarerVisits from "../carervisits/CarerVisits";
import "./carerpage.style.scss";


function CarerPage() {
  const currentUser = useSelector((state) => state.user.currentUser);

  let navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role === "admin") {
      navigate("/admin");
    }
  }, [currentUser, navigate]);

  return <CarerVisits currentUser={currentUser} />;
}
export default CarerPage;
