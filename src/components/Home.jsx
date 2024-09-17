import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "./URL"; 

const Home = () => {
  const [jobSheets, setJobSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch all job sheets from the API
  useEffect(() => {
    const fetchJobSheets = async () => {
      try {
        const backendURL = URL();
        const response = await axios.get(`${backendURL}/NewJobSheet/getthedetails`);
        setJobSheets(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job sheets:", err);
        setError("Failed to fetch job sheets");
        setLoading(false);
      }
    };

    fetchJobSheets();
  }, []);

  // Handle delete functionality
  const handleDelete = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this job sheet?")) {
      try {
        const backendURL = URL();
        await axios.delete(`${backendURL}/NewJobSheet/getthedetails/${clientId}`);
        setJobSheets(jobSheets.filter((job) => job._id !== clientId));
        alert("Job Sheet deleted successfully!");
      } catch (err) {
        console.error("Error deleting job sheet:", err);
        alert("Failed to delete job sheet.");
      }
    }
  };

  // Handle search
  const filteredJobSheets = jobSheets.filter((jobSheet) => {
    return (
      jobSheet.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobSheet.clientId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <p>Loading job sheets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="bg-light">
        <div className="row justify-content-center m-1 mt-4">
          <div className="col-md-12">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search by Client Name or ID....."
                aria-label="Search"
                value={searchQuery} // Controlled input
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
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
            New Job Sheet
          </Link>
        </div>
      </div>

      <div className="container mt-3">
        <table className="table table-striped">
          <thead>
            <tr className="bg-primary text-white">
              <th>#</th>
              <th>Client ID</th>
              <th>Client Name</th>
              <th>Contact Info</th>
              <th>Received Date</th>
              <th>Inventory Received</th>
              <th>Reported Issue</th>
              <th>Estimated Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobSheets.length > 0 ? (
              filteredJobSheets.map((jobSheet, index) => (
                <tr key={jobSheet._id}>
                  <td>{index + 1}</td> {/* Serial number */}
                  <td>{jobSheet.clientId}</td>
                  <td>{jobSheet.clientName}</td>
                  <td>{jobSheet.contactInfo}</td>
                  <td>{new Date(jobSheet.receivedDate).toLocaleDateString()}</td>
                  <td>{jobSheet.inventoryReceived}</td>
                  <td>{jobSheet.reportedIssue}</td>
                  <td>{jobSheet.estimatedAmount}</td>
                  <td>{jobSheet.status}</td>
                  <td className="d-flex justify-content-between">
                    <Link className="btn btn-info btn-sm" to="/Profile">
                      View
                    </Link>
                    <button className="btn btn-warning btn-sm">
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(jobSheet._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No job sheets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
