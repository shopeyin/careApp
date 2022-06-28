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
        .map((serviceuser) => {
          return newArray.push({ name: serviceuser.name, id: serviceuser._id });
        });
    }

    return newArray;
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-success"
      >
        Service Users In Visit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title> All Service Users In Visit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filterServiceUsers(serviceUsersToVisitId).map((serviceuser) => {
            return (
              <p key={serviceuser.id}>
                {serviceuser.name}
                <button
                  className="btn btn-danger m-2"
                  onClick={() => {
                    handleSubmit(visitId, serviceuser.id);
                    reMountComponent();
                  }}
                >
                  Remove Service User from Visit
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
