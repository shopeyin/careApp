import React from "react";
import { format } from "date-fns";
function Visit({ serviceUsersVisit, selectedDate, itemsToRender }) {
  return (
    <>
      {serviceUsersVisit && serviceUsersVisit.length ? (
        itemsToRender
      ) : (
        <div className="row mt-3 d-flex  justify-content-center">
          <div className="col-8 col-sm-4 ">
            <div className="card">
              <div className="card-body text-center">
                No visit on {format(new Date(selectedDate), "yyyy-MM-dd")}
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
export default Visit;
