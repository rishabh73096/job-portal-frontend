import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import New_Job_Sheet from "./components/New_Job_Sheet.jsx"
import Profile from "./components/Profile.jsx";
import Edit_employee from "./components/Edit_employee.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/NewJobSheet" element={<New_Job_Sheet />}/>
        <Route path="/Profile/:clientId" element={<Profile/>}/>
        <Route path="/edit-employee/:clientId" element={<Edit_employee/>}/>
      </Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
