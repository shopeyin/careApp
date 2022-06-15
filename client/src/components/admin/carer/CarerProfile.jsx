import React from "react";
import { useSelector } from "react-redux";
import Visit from "../visit/Visit";
import EditVisit from "../visit/EditVisit";
import { useParams } from "react-router-dom";

import axios from "axios";
const URL = "http://127.0.0.1:1000/api/v1/visit";

function CarerProfile() {
  const [visits, setVisits] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const reMountComponent = () => {
    setReload(!reload);
  };

  const params = useParams();

  let carer;

  useSelector((state) => {
    const found = state.carers.carers.find(
      (element) => element._id === params.carerId
    );

    carer = found;
  });

  const handleDeleteVisit = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      reMountComponent();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchAllCarerVisits = async () => {
      try {
        const carerVisit = await axios.get(`${URL}/${params.carerId}`);

        const {
          data: { data },
        } = carerVisit;
        console.log(data);

        setVisits(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCarerVisits();
  }, [params.carerId, reload]);
  console.log(visits.visit);
  return (
    <div className="row d-flex align-items-center inneradminpage">
      <div className="col-md-5">
        <h2>CarerProfile</h2>
        <p>{carer ? carer.name : ""}</p>

        <Visit
          carerId={carer._id}
          reMountComponent={reMountComponent}
          handleDeleteVisit={handleDeleteVisit}
        />
        <h3>
          {" "}
          {carer ? carer.name : ""} has {visits.visitLength} visits
        </h3>
        {visits.visit &&
          visits.visit.map((item) => {
            return (
              <div key={item._id}>
                <p> Visit Id - {item._id}</p>
                <p>Date of Visit- {item.dateOfVisit}</p> Service users Id -{" "}
                {item.serviceusersToVisit.map((i, index) => {
                  return <p key={index}>{i}</p>;
                })}{" "}
                <button
                  onClick={() => {
                    handleDeleteVisit(item._id);
                  }}
                >
                  Delete
                </button>
                <button>Edit</button>
                <EditVisit
                  visitId={item._id}
                  serviceUsersToVisitId={item.serviceusersToVisit}
                />
                <br></br>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CarerProfile;
