import React from "react";

import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:1000/api/v1/visit/";

function DeleteServiceUserFromVisit({
  serviceUsers,
  serviceUsersToVisitId,
  visitId,
  reMountComponent,
}) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  

  const handleSubmit = async (visitId, serviceUserId) => {
    await axios.post(`${BASE_URL}/delete/${visitId}`, {
      serviceusersToVisit: serviceUserId,
    });
    console.log("submitteddd");
  };

  function filterServiceUsers(arr) {
    let newArray = [];

    for (let index = 0; index < arr.length; index++) {
      serviceUsers
        .map((i) => {
          return i;
        })
        .filter((j) => {
          return j._id === arr[index];
        })
        .map((m) => {
          return newArray.push({ name: m.name, id: m._id });
        });
    }

    return newArray;
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Remove Service User
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title> Remove Service User from Visit {visitId}--</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filterServiceUsers(serviceUsersToVisitId).map((serviceuser) => {
            return (
              <p key={serviceuser.id}>
                {serviceuser.name} {serviceuser.id}
                <button
                  onClick={() => {
                    handleSubmit(visitId, serviceuser.id);
                    reMountComponent();
                  }}
                >
                  Delete
                </button>
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteServiceUserFromVisit;
