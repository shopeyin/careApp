import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { addHours } from "date-fns";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:1000/api/v1/visit/";

function AddVisit({
  carerId,
  serviceUsers,
  reMountComponent,
  handleDeleteVisit,
}) {
  const [visit, setVisit] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [serviceUserInfo, setServiceUserInfo] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [disableBtn, setDisableBtn] = React.useState(true);
  const [time, setTime] = React.useState(new Date());

  let dataId = {
    careruser: carerId,
  };

  const updateVisitData = {
    serviceusersToVisit: serviceUserInfo,

    dateOfVisit: addHours(selectedDate, 1),
  };

  useEffect(() => {
    if (serviceUserInfo && selectedDate) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [selectedDate, serviceUserInfo, disableBtn]);

  const handleSubmit = async (visitId) => {
    await axios.post(
      `${BASE_URL}/add/${visitId}`,

      updateVisitData
    );
    console.log(updateVisitData);
    reMountComponent();
  };

  const createVisit = async () => {
    let newVisit = await axios.post(BASE_URL, dataId);

    const {
      data: {
        data: { visit },
      },
    } = newVisit;

    setVisit(visit);

    console.log("visit created");
  };

  const handleClose = () => {
    setServiceUserInfo([]);
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    createVisit();
  };
  
  function handleChange(event) {
    console.log(event.target.value);
  }

  console.log(time);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Visit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Modal heading {visit ? visit._id : ""} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Date{" "}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
          All the service users{" "}
          {serviceUsers.map((serviceUser) => {
            return (
              <div key={serviceUser._id}>
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
                          </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleDeleteVisit(visit._id);
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            disabled={disableBtn ? disableBtn : ""}
            variant="primary"
            onClick={() => {
              handleSubmit(visit._id);
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

const mapStateToProps = (state) => ({
  serviceUsers: state.serviceUsers.serviceUsers,
});
// Connect Redux to React
export default connect(mapStateToProps)(AddVisit);
