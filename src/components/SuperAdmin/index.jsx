import React from "react";
import Sidebar from "../../Utilities/Sidebar";
import LMSNavbar from "../../Utilities/Navbar";
import { Outlet } from "react-router";


const SuperAdmin = (props) => {
  return (
    <>
      <LMSNavbar {...props}/>

      <div className="">
        <div className="row me-0">
          <div className="col-12 col-md-3">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdmin;
