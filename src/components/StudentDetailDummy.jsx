import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../styles/studentDetaildummy.css";

const StudentDetailDummy = () => {
    const { prn } = useParams();
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState({
        residential: false,
        parent: false,
        academic: false,
        miscellaneous: false,
    });

    const toggleSection = (section) => {
        setIsExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const collapsibleSections = [
        {
            title: "Residential Details",
            section: "residential",
            content: [
                { label: "Currently Living With", value: "Parents" },
                { label: "Current Address", value: "123, Main Street" },
                { label: "Permanent Address", value: "Same as above" },
                { label: "State", value: "Maharashtra" },
                { label: "Area", value: "Pune" },
            ],
        },
        {
            title: "Parent/Guardian Details",
            section: "parent",
            content: [
                { label: "Father", value: "John Senior, Engineer, 1234567890" },
                { label: "Mother", value: "Jane Doe, Teacher, 0987654321" },
                { label: "Guardian", value: "N/A" },
            ],
        },
        {
            title: "Academic Details",
            section: "academic",
            content: [
                { label: "10th Percentage", value: "95% (CBSE)" },
                { label: "12th Percentage", value: "92% (HSC)" },
                { label: "JEE Percentile", value: "99.5%" },
                { label: "Post-Admission", value: "Semester-wise scores displayed above" },
            ],
        },
        {
            title: "Miscellaneous Details",
            section: "miscellaneous",
            content: [
                { label: "Hobbies", value: "Reading, Coding" },
                { label: "Strengths", value: "Problem-solving" },
                { label: "Weaknesses", value: "Perfectionism" },
                { label: "Short-term Goals", value: "Internship" },
                { label: "Long-term Goals", value: "Software Engineer" },
            ],
        },
    ];

    return (
        <div className="student-detail">
            <div className="main-content">
                <div className="header">
                    <img
                        src="/path/to/profile-pic.jpg"
                        alt="Profile"
                        className="profile-pic"
                    />
                    <div className="student-info">
                        <h2>John Doe</h2>
                        <p className="prn">PRN: {prn}</p>
                    </div>
                </div>

                <div className="statistics">
                    <div className="attendance-chart">
                        <h3>Attendance Chart</h3>
                        <div className="chart-placeholder">Chart Data Here</div>
                    </div>
                    <div className="cgpa-table">
                        <h3>SGPA Table</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Semester</th>
                                    <th>SGPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(4)].map((_, year) =>
                                    [...Array(2)].map((_, sem) => (
                                        <tr key={`${year}-${sem}`}>
                                            {sem === 0 && (
                                                <td rowSpan={2}>{year + 1}</td>
                                            )}
                                            <td>{`Sem ${sem + 1}`}</td>
                                            <td>{(8 + year + sem / 10).toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="collapsible-sections">
                    {collapsibleSections.map(({ title, section, content }) => (
                        <div className="section" key={section}>
                            <h3 onClick={() => toggleSection(section)}>{title}</h3>
                            {isExpanded[section] && (
                                <table className="detail-table">
                                    <tbody>
                                        {content.map(({ label, value }, index) => (
                                            <tr key={index}>
                                                <td className="label">{label}</td>
                                                <td className="value">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ))}
                </div>

                <div className="buttons">
                    <button onClick={() => navigate(`/changes-for-approval/${prn}`)}>
                        View Changes Submitted For Approval
                    </button>
                    <button onClick={() => navigate(`/leave-approval/${prn}`)}>
                        View Leave Approvals Submitted
                    </button>
                    <button onClick={() => navigate(`/mentor-observations/${prn}`)}>
                        Give Observation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailDummy;
