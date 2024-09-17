import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-light">
      <div className="row justify-content-center m-1 mt-4">
        <div className="col-md-12">
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search by Client Name or ID....."
              aria-label="Search"
            />
            <div className="input-group-append ms-1">
              <button className="btn btn-primary" type="button">
Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <Link className="btn btn-primary" type="button" to="/NewJobSheet">
       New Job Sheet </Link>
         
        
      </div>
    </div>
  );
};

export default Header;
