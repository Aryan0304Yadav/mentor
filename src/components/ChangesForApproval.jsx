// import React, { useEffect, useState } from "react";
// import '../styles/ChangesForApproval.css'
// const ChangesForApproval = () => {
//   const [changes, setChanges] = useState([]);
//   const [filteredChanges, setFilteredChanges] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedChange, setSelectedChange] = useState(null);

//   const ITEMS_PER_PAGE = 10;

//   // Fetch Data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://6773da9077a26d4701c6886e.mockapi.io/approval"
//         );
//         const data = await response.json();
//         setChanges(data);
//         setFilteredChanges(data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle Search
//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
    
//     const filtered = changes.filter((change) =>
//       change.prn.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredChanges(filtered);
//     setCurrentPage(1);
//   };

//   // Handle Action Click (Approve/Reject)
//   const handleActionClick = (change, action) => {
//     setSelectedChange({ ...change, action });
//     setShowConfirmation(true);
//   };

//   // Handle Confirm
//   const handleConfirm = async () => {
//     if (!selectedChange) return;
  
  
//     try {
//       const response = await fetch(
//         `https://6773da9077a26d4701c6886e.mockapi.io/approvals/${selectedChange.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             status: selectedChange.action,
//             updatedVersion: selectedChange.newVersion,
//           }),
//         }
//       );
  
//       if (!response.ok) {
//         console.error("Failed with status:", response.status);
//         alert("Failed to update status. Please try again!");
//         return;
//       }
  
//       const updatedChange = await response.json(); // Updated data
  
//       const updatedChanges = changes.map((item) =>
//         item.id === updatedChange.id
//           ? { ...item, status: updatedChange.status }
//           : item
//       );
  
//       setChanges(updatedChanges); // Update the state with new changes
//       setFilteredChanges(
//         updatedChanges.filter((change) =>
//           change.prn.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
  
//       // Reset confirmation modal
//       setShowConfirmation(false);
//       setSelectedChange(null);
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update status. Please try again!");
//     }
//   };
  

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredChanges.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const displayedChanges = filteredChanges.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   return (
//     <div className="changes-container">
//       <div className="search-section">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by PRN..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>

//       <div className="changes-list">
//         {displayedChanges.map((change) => (
//           <div key={change.id} className="change-item">
//             <div className="prn-header">PRN: {change.prn}</div>
//             <div className="versions-container">
//               <div className="version-box">
//                 <div className="version-title">Old Version</div>
//                 <div className="version-content">{change.oldVersion}</div>
//               </div>
//               <div className="version-box">
//                 <div className="version-title">New Version</div>
//                 <div className="version-content">{change.newVersion}</div>
//               </div>
//             </div>
//             <div className="buttons-container">
//               <button
//                 onClick={() => handleActionClick(change, "rejected")}
//                 className="reject-button"
//               >
//                 Reject
//               </button>
//               <button
//                 onClick={() => handleActionClick(change, "approved")}
//                 className="approve-button"
//               >
//                 Approve
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         <button
//           className="pagination-button"
//           onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//         <span className="page-info">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="pagination-button"
//           onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {showConfirmation && (
//         <div className="confirmation-overlay">
//           <div className="confirmation-dialog">
//             <h3>Confirm Action</h3>
//             <p>Are you sure you want to {selectedChange?.action} this change?</p>
//             <div className="confirmation-buttons">
//               <button
//                 className="cancel-button"
//                 onClick={() => {
//                   setShowConfirmation(false);
//                   setSelectedChange(null);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="confirm-button" 
//                 onClick={handleConfirm}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChangesForApproval;
