import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { connect } from "react-redux";
import AddVisit from "../visit/AddVisit";
import AddServiceUserToVisit from "../visit/AddServiceUserToVisit";
import DeleteServiceUserFromVisit from "../visit/DeleteServiceUserFromVisit";
import VisitInformation from "../visit/VisitInformation";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../App";
import axios from "axios";

function CarerProfile({ serviceUsers }) {
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
      await axios.delete(`${BASE_URL}/visit/${id}`);
      reMountComponent();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchAllCarerVisits = async () => {
      try {
        const carerVisit = await axios.get(
          `${BASE_URL}/visit/${params.carerId}`
        );

        const {
          data: { data },
        } = carerVisit;

        const uniqueVisit = [
          ...new Map(
            data.visit.map((item) => [item["dateOfVisit"], item])
          ).values(),
        ];

        setVisits(uniqueVisit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCarerVisits();
  }, [params.carerId, reload]);
  console.log(visits);

  const filteredVisits = visits.filter((obj) => {
    return obj.dateOfVisit !== undefined;
  });
  console.log(filteredVisits, "filetered");
  return (
    <>
      <div className="row mt-4">
        <div className="col-md-5">
          <h3>
            {carer ? carer.name : ""} {carer ? carer.barePassword : ""}
          </h3>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-5">
          <AddVisit
            carerId={carer._id}
            reMountComponent={reMountComponent}
            handleDeleteVisit={handleDeleteVisit}
            visits={visits}
          />
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-md-5">
          <h3>
            {carer ? carer.name : ""} has{" "}
            {filteredVisits.length > 1
              ? `${filteredVisits.length}  visits`
              : `${filteredVisits.length}  visit`}
          </h3>
        </div>
      </div>
      {filteredVisits &&
        filteredVisits.map((item) => {
          return (
            <div key={item._id} className="row mt-4">
              <div className="col col-md-2">
                {" "}
                {item.dateOfVisit ? (
                  <VisitInformation
                    visitId={item._id}
                    dateOfVisit={format(
                      new Date(item.dateOfVisit),
                      "yyyy-MM-dd"
                    )}
                  />
                ) : (
                  <VisitInformation visitId={item._id} />
                )}
              </div>
              <div className="col-12 col-md-2  ">
                <DeleteServiceUserFromVisit
                  serviceUsers={serviceUsers}
                  visitId={item._id}
                  serviceUsersToVisitId={item.serviceusersToVisit}
                  reMountComponent={reMountComponent}
                />
              </div>
              <div className="col col-md-2 ">
                {" "}
                <AddServiceUserToVisit
                  serviceUsers={serviceUsers}
                  visitId={item._id}
                  dateOfVisit={item.dateOfVisit}
                  reMountComponent={reMountComponent}
                />
              </div>
              <div className="col col-sm-1 ">
                <i
                  className="fa-solid fa-trash-can mt-2"
                  onClick={() => {
                    handleDeleteVisit(item._id);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
    </>
  );
}
const mapStateToProps = (state) => ({
  serviceUsers: state.serviceUsers.serviceUsers,
});
// Connect Redux to React

export default connect(mapStateToProps)(CarerProfile);
