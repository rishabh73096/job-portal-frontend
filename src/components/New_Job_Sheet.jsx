import { useState } from "react";
import axios from "axios";
import { URL } from "./URL";  // Make sure your URL export is correct
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Customer() {
  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",
    contactInfo: "",
    receivedDate: "",
    inventoryReceived: "",
    uploadInventory: "",
    imageDocument: "",
    reportedIssue: "",
    clientNotes: "",
    assignedTechnician: "",
    deadline: "",
    estimatedAmount: "",
    status: ""
  });
  const MySwal = withReactContent(Swal);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    const data = new FormData();
    
    // Append all the form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const backendURL = URL();
      const url = `${backendURL}/NewJobSheet/NewJobSheet`;
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      MySwal.fire({
        title: "Registration done!",
        text: response.data,
        icon: "success",
      });

      // Reset form data after successful submission
      setFormData({
        clientId: "",
        clientName: "",
        contactInfo: "",
        receivedDate: "",
        inventoryReceived: "",
        uploadInventory: "",
        imageDocument: "",
        reportedIssue: "",
        clientNotes: "",
        assignedTechnician: "",
        deadline: "",
        estimatedAmount: "",
        status: ""
      });

      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-7 col-lg-7 col-10 register-right">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <h3 className="register-heading text-center">New Job Sheet Form</h3>
              <form onSubmit={handlSubmit} noValidate>
                <div className="row register-form">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label htmlFor="clientId">Client ID</label>
                      <input
                        className="form-control mb-3"
                        type="text"
                        id="clientId"
                        placeholder="Enter Client ID"
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        required
                      />
                      {error.clientId && <span className="text-danger">{error.clientId}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="clientName">Client Name</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="clientName"
                        placeholder="Enter Client Name"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                      />
                      {error.clientName && <span className="text-danger">{error.clientName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contactInfo">Contact Info</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="contactInfo"
                        placeholder="Enter Contact Info"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        required
                      />
                      {error.contactInfo && <span className="text-danger">{error.contactInfo}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="receivedDate">Received Date</label>
                      <input
                        type="date"
                        className="form-control mb-3"
                        id="receivedDate"
                        name="receivedDate"
                        value={formData.receivedDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inventoryReceived">Inventory Received</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="inventoryReceived"
                        placeholder="Enter Inventory Details"
                        name="inventoryReceived"
                        value={formData.inventoryReceived}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="uploadInventory">Upload Inventory</label>
                      <input
                        type="file"
                        className="form-control mb-3"
                        id="uploadInventory"
                        name="uploadInventory"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="imageDocument">Image Document</label>
                      <input
                        type="file"
                        className="form-control mb-3"
                        id="imageDocument"
                        name="imageDocument"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="reportedIssue">Reported Issue</label>
                      <textarea
                        className="form-control mb-3"
                        id="reportedIssue"
                        placeholder="Describe the reported issue"
                        name="reportedIssue"
                        value={formData.reportedIssue}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="clientNotes">Client Notes</label>
                      <textarea
                        className="form-control mb-3"
                        id="clientNotes"
                        placeholder="Additional notes from client"
                        name="clientNotes"
                        value={formData.clientNotes}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="assignedTechnician">Assigned Technician</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="assignedTechnician"
                        placeholder="Enter Technician Name"
                        name="assignedTechnician"
                        value={formData.assignedTechnician}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="deadline">Deadline</label>
                      <input
                        type="date"
                        className="form-control mb-3"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="estimatedAmount">Estimated Amount</label>
                      <input
                        type="number"
                        className="form-control mb-3"
                        id="estimatedAmount"
                        placeholder="Enter Estimated Amount"
                        name="estimatedAmount"
                        value={formData.estimatedAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        className="form-control mb-3"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="pending">Pending</option>
                        <option value="in-process">In-process</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <button className="btn btn-primary btn-lg w-full text-center" type="submit">
                      Save Job Sheet
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
