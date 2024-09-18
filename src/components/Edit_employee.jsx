import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "./URL"; 

const Edit_employee = () => {
  const { clientId } = useParams(); 
  const [jobSheet, setJobSheet] = useState({
    clientId: "",
    clientName: "",
    contactInfo: "",
    receivedDate: "",
    inventoryReceived: "",
    reportedIssue: "",
    estimatedAmount: "",
    status: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchJobSheetDetails = async () => {
      try {
        const backendURL = URL();
        const response = await axios.get(`${backendURL}/NewJobSheet/updateJobSheet/${clientId}`);
        setJobSheet(response.data); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job sheet details:", err);
        setError("Failed to fetch job sheet details.");
        setLoading(false);
      }
    };
    fetchJobSheetDetails();
  }, [clientId]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobSheet((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendURL = URL();
      await axios.get(`${backendURL}/NewJobSheet/updateJobSheet/${clientId}`, jobSheet);
      alert("Job Sheet updated successfully!");
      navigate(`/profile/${clientId}`); 
    } catch (err) {
      console.error("Error updating job sheet:", err);
      alert("Failed to update job sheet.");
    }
  };

  if (loading) {
    return <p>Loading job sheet details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-2">
      <h3 className="text-center">Edit Job Sheet</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Client ID</label>
          <input
            type="text"
            className="form-control"
            name="clientId"
            value={jobSheet.clientId}
            onChange={handleChange}
            disabled 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Client Name</label>
          <input
            type="text"
            className="form-control"
            name="clientName"
            value={jobSheet.clientName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Info</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo"
            value={jobSheet.contactInfo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Received Date</label>
          <input
            type="date"
            className="form-control"
            name="receivedDate"
            value={jobSheet.receivedDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Inventory Received</label>
          <input
            type="text"
            className="form-control"
            name="inventoryReceived"
            value={jobSheet.inventoryReceived}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Reported Issue</label>
          <input
            type="text"
            className="form-control"
            name="reportedIssue"
            value={jobSheet.reportedIssue}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Estimated Amount</label>
          <input
            type="number"
            className="form-control"
            name="estimatedAmount"
            value={jobSheet.estimatedAmount}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            name="status"
            value={jobSheet.status}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>

      <button className="btn btn-secondary mt-3 mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Edit_employee;
