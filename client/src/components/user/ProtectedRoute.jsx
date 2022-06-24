import React from "react";

import { Navigate, Outlet } from "react-router-dom";

// function ProtectedRoute({ isAllowed, redirectPath = "/", children }) {
//   if (!isAllowed) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children ? children : <Outlet />;
// }

// export default ProtectedRoute;

// function ProtectedRoute({ isAllowed, redirectPath, children }) {
//   if (isAllowed) {
//     return children ? children : <Outlet />;
//   }

//   return <Navigate to={redirectPath} replace />;
// }

// export default ProtectedRoute;

function ProtectedRoute({ isAllowed, children, redirectPath }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
