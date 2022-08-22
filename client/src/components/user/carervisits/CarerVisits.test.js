import { shallow } from "enzyme";
import React from "react";
import CarerVisits from "./CarerVisits";
import shallowToJson from "enzyme-to-json";
import { fetchVisit } from "../utils";

import mockAxios from "axios";

jest.mock("axios");

describe("carer visit component", () => {
  let mockCurrentUser = {
    role: "carer",
    _id: 1,
    name: "belinda",
    barePassword: "123456",
    email: "belinda@gmail.com",
    password: "12345666665667",
  };

  const wrapper = shallow(<CarerVisits currentUser={mockCurrentUser} />);

  it("expect to render carervisit component", () => {
    //expect(shallowToJson(wrapper)).toMatchSnapshot();

    expect(wrapper.find(".container-fluid").length).toBe(1);
  });

  // it("calls fetch visit api with accurate data", async () => {
  //   expect.assertions(1);

  //   let visitDate = {
  //     dateOfVisit: "2022-08-17T00:00:00.000+00:00",
  //   };

  //   let result = await fetchVisit("62bc001b2105fc4bd8981d70", visitDate);
  //   console.log(result);

  //   expect(result.length).toBe(1);
  // });

  // it("calls fetch visit api with inaccurate data", async () => {
  //   let visitDate = {
  //     dateOfVisit: "2022-08-17T00:00:00.000+00:00",
  //   };

  //   let result = await fetchVisit("62bc001b2105fc4bd8981d78", visitDate);

  //   expect(result.length).toBe(0);
  // });

  it("should return visit for the day", async () => {
    const visit = [
      {
        careruser: "62bc001b2105fc4bd8981d70",
        dateOfVisit: "2022-08-16T00:00:00.000Z",
        _id: "62fb259fed320240f851ebb9",
        serviceusersToVisit: [[Object]],
      },
    ];

    let visitDate = {
      dateOfVisit: "2022-08-17T00:00:00.000+00:00",
    };

    mockAxios.post.mockImplementation(() => Promise.resolve({ data: visit }));
    let result = await fetchVisit("62bc001b2105fc4bd8981d70", visitDate);
    console.log(result);
  });
});

// let wrapper;

// beforeEach(() => {
//   const mockProps = {
//     currentUser: "ola",
//   };
//   wrapper = shallow(<CarerVisits {...mockProps} />);
// });

// it("expect to render CarerVisit component", () => {
//   expect(shallowToJson(wrapper)).toMatchSnapshot();
// });
