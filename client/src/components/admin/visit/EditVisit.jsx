// import React from "react";
// import { connect } from "react-redux";
// import { Modal, Button } from "react-bootstrap";

// function EditVisit({ visitId, serviceUsersToVisitId, serviceUsers }) {
//   const [show, setShow] = React.useState(false);

//   const handleClose = () => {
//     setShow(false);
//   };

//   const handleShow = () => {
//     setShow(true);
//   };

//   function filterServiceUsers(arr) {
//     let newArray = [];

//     for (let index = 0; index < arr.length; index++) {
//       serviceUsers
//         .map((i) => {
//           return i;
//         })
//         .filter((j) => {
//           return j._id === arr[index];
//         })
//         .map((m) => {
//           return newArray.push({ name: m.name, id: m._id });
//         });
//     }
//     return newArray;
//   }

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Edit Visit
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         centered
//         size="lg"
//         backdrop="static"
//       >
//         <Modal.Header>
//           <Modal.Title>Edit Visit {visitId} --</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {filterServiceUsers(serviceUsersToVisitId).map((serviceuser) => {
//             return <p key={serviceuser.id}>{serviceuser.name}</p>;
//           })}
//           {/* <input type="checkbox" value /> */}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
// const mapStateToProps = (state) => ({
//   serviceUsers: state.serviceUsers.serviceUsers,
// });
// // Connect Redux to React

// export default connect(mapStateToProps)(EditVisit);

import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:1000/api/v1/visit/";

function EditVisit({ visitId, serviceUsersToVisitId, serviceUsers }) {
  const [show, setShow] = React.useState(false);

  const [serviceUserInfo, setServiceUserInfo] = React.useState([]);

  const updateVisitData = {
    serviceusersToVisit: serviceUserInfo,
    dateOfVisit: "2022-06-17T00:00:00.000+00:00",
  };

  const handleSubmit = async (visitId) => {
    await axios.post(
      `${BASE_URL}/add/${visitId}`,

      updateVisitData
    );
    console.log(updateVisitData);
  };

  const handleClose = () => {
    setServiceUserInfo([]);
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
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
  console.log(serviceUserInfo);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Visit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Edit Visit {visitId} --</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filterServiceUsers(serviceUsersToVisitId).map((serviceuser) => {
            return (
              <p key={serviceuser.id}>
                {serviceuser.name}
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setServiceUserInfo([...serviceUserInfo, serviceuser.id]);
                    } else {
                      setServiceUserInfo(
                        serviceUserInfo.filter(
                          (serviceuserId) => serviceuserId !== serviceuser.id
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
            Save
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

export default connect(mapStateToProps)(EditVisit);
