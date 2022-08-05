import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
const VISIT_URL = "http://127.0.0.1:1000/api/v1/visitInformation";

function VisitInformation({ visitId, dateOfVisit }) {
  const [show, setShow] = React.useState(false);
  const [visitInfo, setVisitInfo] = React.useState([]);

  const getVisitInformation = async (id) => {
    try {
      let visitInfo = await axios.get(`${VISIT_URL}/${id}`);

      const {
        data: { data },
      } = visitInfo;

      setVisitInfo(data.visit);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow();
          getVisitInformation(visitId);
        }}
        className="btn btn-secondary"
      >
        Visit Information {dateOfVisit}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title> visit Information {dateOfVisit} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {visitInfo.map((visit) => {
            return (
              <div key={visit._id}>
                {" "}
                Visit Note: {visit.visitNote}
                <p> Visit Time: {visit.time}</p>
                <p> ServiceUserName: {visit.serviceUserName}</p>
                <p>
                  {" "}
                  Difference In Distance:{" "}
                  {visit.diffInDistance ? visit.diffInDistance : ""}
                </p>
                {/* {visit.activities ? "yes" : "no"} */}
                Activities:{" "}
                {visit.activities
                  ? Object.keys(visit.activities).map((key, i) => {
                      return (
                        <div key={i}>
                          {key}--
                          {visit.activities[key]}
                        </div>
                      );
                    })
                  : ""}
                <p> ---------------------</p>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VisitInformation;
