import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "./URL";
import jsPDF from "jspdf";

const Profile = () => {
  const { clientId } = useParams(); 
  const [jobSheet, setJobSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch job sheet details from the API
  useEffect(() => {
    const fetchJobSheetDetails = async () => {
      try {
        const backendURL = URL();
        console.log(clientId);
  
        // Update the URL to use query parameters
        const response = await axios.get(
          `${backendURL}/NewJobSheet/profile?clientId=${clientId}`  // Use query parameter
        );
        setJobSheet(response.data);
        // console.log(response.data);
  
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job sheet details:", err);
        setError("Failed to fetch job sheet details");
        setLoading(false);
      }
    };
  
    fetchJobSheetDetails();
  }, [clientId]);
  

  // Handle Delete functionality
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job sheet?")) {
      try {
        const backendURL = URL();
        await axios.delete(
          `${backendURL}/NewJobSheet/profile/${clientId}`
        );
        alert("Job Sheet deleted successfully!");
        navigate("/"); 
      } catch (err) {
        console.error("Error deleting job sheet:", err);
        alert("Failed to delete job sheet.");
      }
    }
  };

  // Handle PDF download
  const handlePDFDownload = () => {
    if (jobSheet) {
      const doc = new jsPDF();
      doc.text(`Job Sheet: ${jobSheet.clientName}`, 10, 10);
      doc.text(`Client ID: ${jobSheet.clientId}`, 10, 20);
      doc.text(`Contact Info: ${jobSheet.contactInfo}`, 10, 30);
      doc.text(
        `Received Date: ${new Date(
          jobSheet.receivedDate
        ).toLocaleDateString()}`,
        10,
        40
      );
      doc.text(`Inventory Received: ${jobSheet.inventoryReceived}`, 10, 50);
      doc.text(`Reported Issue: ${jobSheet.reportedIssue}`, 10, 60);
      doc.text(`Estimated Amount: ${jobSheet.estimatedAmount}`, 10, 70);
      doc.text(`Status: ${jobSheet.status}`, 10, 80);
      doc.save("JobSheet.pdf");
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
      <div className="card mt-4 p-3 col-11">
        <h4 className="text-center">View Job Sheet</h4>

        {jobSheet ? (
          <>
            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Client ID:</strong>
              </div>
              <div className="col-md-8 p-2">{jobSheet.clientId}</div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Client Name:</strong>
              </div>
              <div className="col-md-8 p-2">{jobSheet.clientName}</div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Contact Info:</strong>
              </div>
              <div className="col-md-8 p-2">{jobSheet.contactInfo}</div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Received Date:</strong>
              </div>
              <div className="col-md-8 p-2">
                {new Date(jobSheet.receivedDate).toLocaleDateString()}
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Inventory Received:</strong>
              </div>
              <div className="col-md-8 p-2">{jobSheet.inventoryReceived}</div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Reported Issue:</strong>
              </div>
              <div className="col-md-8 p-2">{jobSheet.reportedIssue}</div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Estimated Amount:</strong>
              </div>
              <div className="col-md-8 p-2">{jobSheet.estimatedAmount}</div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 bg-primary text-white p-2">
                <strong>Status:</strong>
              </div>
              <div className="col-md-8 p-2">{jobSheet.status}</div>
            </div>

            <div className="d-flex justify-content-start gap-4 mt-4">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>

              <button className="btn btn-warning">Edit</button>

              <Link to="/" className="btn btn-secondary">
                Back
              </Link>
            </div>

            <div className="text-center mt-4 mb-2">
              <button className="btn btn-primary" onClick={handlePDFDownload}>
                Save as PDF
              </button>
            </div>
          </>
        ) : (
          <p>Loading job sheet data...</p> // Loading state or error message
        )}
      </div>
    </div>
  );
};

export default Profile;
