import React from "react";

import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:1000/api/v1/visit/";

function AddServiceUserToVisit({
  serviceUsers,
  visitId,
  dateOfVisit,
  reMountComponent,
}) {
  const [show, setShow] = React.useState(false);
  const [serviceUserInfo, setServiceUserInfo] = React.useState([]);

  const updateVisitData = {
    serviceusersToVisit: serviceUserInfo,

    dateOfVisit: dateOfVisit,
  };

  const handleSubmit = async (visitId) => {
    await axios.post(
      `${BASE_URL}/add/${visitId}`,

      updateVisitData
    );
    console.log(updateVisitData);
    reMountComponent();
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn btn-info">
        Add Service User
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Add ServiceUser To Visit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          All the service users{" "}
          {serviceUsers.map((serviceUser) => {
            return (
              <p key={serviceUser._id}>
                {serviceUser.name}{" "}
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setServiceUserInfo([...serviceUserInfo, serviceUser._id]);
                    } else {
                      setServiceUserInfo(
                        serviceUserInfo.filter(
                          (serviceuserId) => serviceuserId !== serviceUser._id
                        )
                      );
                    }
                  }}
                  value={serviceUserInfo}
                />
              </p>
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
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(visitId);
              handleClose();
            }}
          >
            Save Visit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddServiceUserToVisit;
