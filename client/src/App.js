import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePage from "./components/admin/adminhomepage/AdminHomePage";
// eslint-disable-next-line react-hooks/exhaustive-deps

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="adminn/*" element={<AdminHomePage />} />
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
