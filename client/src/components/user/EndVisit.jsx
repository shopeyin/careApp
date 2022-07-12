import React from "react";
import { Modal, Button } from "react-bootstrap";

function EndVisit({ endTimeFunction, disableBtn }) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <Button
        disabled={disableBtn ? disableBtn : ""}
        variant="primary"
        onClick={() => {
          handleShow();
        }}
        className="btn btn-success btn-block"
      >
        End Visit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title> Do you want to End the Visit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="row d-flex justify-content-center">
            <div className="col-5">
              <button
                type="button"
                className="btn btn-block btn-secondary"
                onClick={() => {
                  endTimeFunction();
                  handleClose();
                }}
              >
                End{" "}
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

export default EndVisit;
