import React from "react";
import { Modal, Button } from "react-bootstrap";

import { format } from "date-fns";

function StartVisit() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const startVisit = () => {
    console.log("visit started");
    const date = new Date();
    console.log(format(date, "HH:mm"));
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
        }}
        className="btn btn-success btn-block"
      >
        Start Visit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title> Do you want to start the Visit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="row d-flex justify-content-center">
            <div className="col-5 ">
              <button
                type="button"
                className="btn btn-block btn-success"
                onClick={startVisit}
              >
                Start{" "}
              </button>
            </div>
          </div>
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

export default StartVisit;
