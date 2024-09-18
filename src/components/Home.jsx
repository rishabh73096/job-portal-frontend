import { useEffect, useState } from "react";
import { Link ,useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "./URL"; 

const Home = () => {
  const [jobSheets, setJobSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const { clientId } = useParams(); 


  useEffect(() => {
    const fetchJobSheets = async () => {
      try {
        const backendURL = URL();
        const response = await axios.get(`${backendURL}/NewJobSheet/getthedetails`);
         setJobSheets(response.data);
        console.log("API Response:", response.data);
        // If the response is an array, set the state; otherwise, handle accordingly
        if (Array.isArray(response.data)) {
          setJobSheets(response.data);
        } else {
          setJobSheets([]); // Set an empty array if the response is not an array
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job sheets:", err);
        setError("Failed to fetch job sheets");
        setLoading(false);
      }
    };

    fetchJobSheets();
  }, []);

const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job sheet?")) {
      try {
        const backendURL = URL();
        await axios.delete(`${backendURL}/NewJobSheet/getthedetails/${clientId}`);
        setJobSheets(jobSheets.filter((job) => job.clientId !== clientId));
        alert("Job Sheet deleted successfully!");
      } catch (err) {
        console.error("Error deleting job sheet:", err);
        alert("Failed to delete job sheet.");
      }
    }
  };


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
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className=" mt-3 ">
        <table className="table table-striped p-2">
          <thead>
            <tr className="bg-primary text-white">
              <th>#</th>
              <th>Client ID</th>
              <th>Client Name</th>
              <th>Contact Info</th>
              <th>Received Date</th>
              <th>Inventory Received</th>
              <th>Reported Issue</th>
              <th>Assigned Technician</th>
              <th>DeadLine</th>
              <th>Estimated Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobSheets.length > 0 ? (
              filteredJobSheets.map((jobSheet, index) => (
                <tr key={jobSheet._id}>
                  <td>{index + 1}</td>
                  <td>{jobSheet.clientId}</td>
                  <td>{jobSheet.clientName}</td>
                  <td>{jobSheet.contactInfo}</td>
                  <td>{new Date(jobSheet.receivedDate).toLocaleDateString()}</td>
                  <td>{jobSheet.inventoryReceived}</td>
                  <td>{jobSheet.reportedIssue}</td>
                  <td>{jobSheet.assignedTechnician}</td>
                  <td>{jobSheet.deadline}</td>
                  <td>{jobSheet.estimatedAmount}</td>
                  <td>{jobSheet.status}</td>
                  <td className="d-flex justify-content-between flex-wrap ">
                    <Link className="btn btn-info btn-sm" to="/Profile/:clientId">
                      View
                    </Link>
                    <Link className="btn btn-warning btn-sm m-1" to="/edit-employee/:clientId">
                      Edit
                    </Link>
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
