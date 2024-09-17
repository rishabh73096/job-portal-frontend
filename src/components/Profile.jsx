import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "./URL";
import jsPDF from "jspdf";

const Profile = () => {
  const { id } = useParams(); // Get job sheet ID from route params
  const [jobSheet, setJobSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch job sheet details from the API
  useEffect(() => {
    const fetchJobSheetDetails = async () => {
      try {
        const backendURL = URL();
        const response = await axios.get(`${backendURL}/NewJobSheet/getthedetails/${id}`);
        setJobSheet(response.data); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job sheet details:", err);
        setError("Failed to fetch job sheet details");
        setLoading(false);
      }
    };

    fetchJobSheetDetails();
  }, [id]);

  // Handle Delete functionality
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job sheet?")) {
      try {
        const backendURL = URL();
        await axios.delete(`${backendURL}/NewJobSheet/getthedetails/${id}`);
        alert("Job Sheet deleted successfully!");
        navigate("/"); // Navigate back to home after delete
      } catch (err) {
        console.error("Error deleting job sheet:", err);
        alert("Failed to delete job sheet.");
      }
    }
  };

  // Handle PDF download
  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text(`Job Sheet: ${jobSheet.clientName}`, 10, 10);
    doc.text(`Client ID: ${jobSheet.clientId}`, 10, 20);
    doc.text(`Contact Info: ${jobSheet.contactInfo}`, 10, 30);
    doc.text(`Received Date: ${new Date(jobSheet.receivedDate).toLocaleDateString()}`, 10, 40);
    doc.text(`Inventory Received: ${jobSheet.inventoryReceived}`, 10, 50);
    doc.text(`Reported Issue: ${jobSheet.reportedIssue}`, 10, 60);
    doc.text(`Estimated Amount: ${jobSheet.estimatedAmount}`, 10, 70);
    doc.text(`Status: ${jobSheet.status}`, 10, 80);
    doc.save("JobSheet.pdf");
  };

  if (loading) {
    return <p>Loading job sheet details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">View Job Sheet</h1>

      <div className="card mt-4 p-3">
        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Client ID:</strong> {jobSheet.clientId}
          </div>
          <div className="col-md-6">
            <strong>Client Name:</strong> {jobSheet.clientName}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Contact Info:</strong> {jobSheet.contactInfo}
          </div>
          <div className="col-md-6">
            <strong>Received Date:</strong> {new Date(jobSheet.receivedDate).toLocaleDateString()}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Inventory Received:</strong> {jobSheet.inventoryReceived}
          </div>
          <div className="col-md-6">
            <strong>Reported Issue:</strong> {jobSheet.reportedIssue}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <strong>Estimated Amount:</strong> {jobSheet.estimatedAmount}
          </div>
          <div className="col-md-6">
            <strong>Status:</strong> {jobSheet.status}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-start gap-4 mt-4">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>

        <button className="btn btn-warning">
          Edit
        </button>

        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
      </div>

      <div className="text-center mt-4">
        
        <button className="btn btn-primary" onClick={handlePDFDownload}>
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default Profile;
