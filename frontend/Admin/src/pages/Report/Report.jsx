import React, { useState } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { MdHistory } from "react-icons/md"; // History icon for viewing notifications
import { IoNotificationsCircleSharp } from "react-icons/io5"; // Icon for sending notifications
import "./Report.css"; // CSS file for styling

const Report = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      content: "Nội dung xuyên tạc",
      userId: 101,
      storyName: "Hôm nay vui quá!",
      createdAt: "2023-12-11",
      status: "In Progress",
      notification: "",
    },
    {
      id: 2,
      content: "Độ tuổi không phù hợp.",
      userId: 102,
      storyName: "Truyện B",
      createdAt: "2023-12-02",
      status: "In Progress",
      notification: "",
    },
    {
      id: 3,
      content: "Kết thúc có hậu ghê!",
      userId: 103,
      storyName: "Truyện A",
      createdAt: "2023-12-01",
      status: "Completed",
      notification: "Your report has been processed and resolved.",
    },
  ]);

  const [filteredReports, setFilteredReports] = useState(reports);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null); // Added for storing selected reason

  const recordsPerPage = 10;

  const totalPages = Math.ceil(filteredReports.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredReports.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    const filtered = reports.filter((report) =>
      report.storyName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredReports(filtered);
    setCurrentPage(1);
  };

  const handleSendNotification = (id) => {
    setSelectedReportId(id);
    setPopupContent(""); // Reset popup content
    setSelectedReason(null); // Reset selected reason
    setShowPopup(true);
  };

  const handleSendNotificationContent = () => {
    if (!selectedReason) {
      alert("Please select a reason before sending the notification.");
      return;
    }

    const updatedReports = reports.map((report) =>
      report.id === selectedReportId
        ? { ...report, notification: selectedReason, status: "Completed" }
        : report
    );
    setReports(updatedReports);
    setFilteredReports(updatedReports);
    setShowPopup(false);
    setSnackbar(true);
    setTimeout(() => setSnackbar(false), 3000);
  };

  const handleShowNotificationHistory = (id) => {
    const report = reports.find((report) => report.id === id);
    setPopupContent(report.notification);
    setShowPopup(true);
  };

  // List of reasons
  const reasons = [
    "Inappropriate content",
    "Offensive language",
    "Age-inappropriate",
    "Violates platform guidelines",
    "Other",
  ];

  return (
    <div className="container">
      <h1>Report Handling</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by story name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>User ID</th>
            <th>Story Name</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.content}</td>
                <td>{report.userId}</td>
                <td>{report.storyName}</td>
                <td>{report.createdAt}</td>
                <td>{report.status}</td>
                <td>
                  {report.status === "In Progress" && (
                    <button
                      className="icon"
                      onClick={() => handleSendNotification(report.id)}
                    >
                      <IoNotificationsCircleSharp />
                    </button>
                  )}
                  {report.status === "Completed" && (
                    <button
                      className="icon"
                      onClick={() => handleShowNotificationHistory(report.id)}
                    >
                      <MdHistory />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{popupContent ? "Notification History" : "Send Notification"}</h3>
            {popupContent ? (
              <p>{popupContent}</p>
            ) : (
              <>
                <p>Select a reason to send notification:</p>
                <div className="reason-buttons">
                  {reasons.map((reason, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedReason(reason)} 
                      className={`reason-button ${selectedReason === reason ? "selected" : ""}`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <button className="confirm-btn" onClick={handleSendNotificationContent}>
                  Send
                </button>
              </>
            )}
            <button className="cancel-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {snackbar && <div className="snackbar">Notification sent successfully!</div>}
    </div>
  );
};

export default Report;
