import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../redux/studentSlice";
import UpdateStudentForm from "./UpdateStudentForm";
import { FaPlusCircle } from "react-icons/fa"; 
import "./css/StudentList.css";

const StudentList = ({ onAddStudent }) => {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.list || []);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    if (!Array.isArray(students)) {
        console.error("Error: students is not an array", students);
        return <p>Error loading student list.</p>;
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch(deleteStudent(id));
        }
    };

    const handleUpdate = (student) => {
        setSelectedStudent(student);
        setShowUpdateForm(true);
    };

    return (
        <div>
            <table border="1" >
                <thead>
                    <tr>
                        <th colSpan="6" style={{ backgroundColor:"#3fa9f7"}}>
                            <h1>Student Management
                            <button 
                                onClick={onAddStudent} className="add-icon">
                                <FaPlusCircle size={24} color="green" />
                            </button>
                            </h1>                            
                            
                        </th>
                    </tr>
                    <tr style={{backgroundColor:"#b2ddfd", fontSize:"20px"}}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <>
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    <i>No students added yet.</i>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    <button onClick={onAddStudent} className="add-btn">
                                       <b> Add </b>
                                    </button>
                                </td>
                            </tr>
                        </>
                    ) : (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.gender}</td>
                                <td>{student.department}</td>
                                <td>
                                    <button onClick={() => handleUpdate(student)} className="action-add-btn">Update</button>
                                    <button onClick={() => handleDelete(student.id)}className="action-del-btn">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {showUpdateForm && selectedStudent && (
                <UpdateStudentForm 
                    student={selectedStudent} 
                    onClose={() => setShowUpdateForm(false)}
                />
            )}
        </div>
    );
};

export default StudentList;
