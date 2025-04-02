import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStudent } from "../redux/studentSlice";
import "./css/UpdateStudentForm.css"; 

const UpdateStudentForm = ({ student, onClose }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list); 

  const [formData, setFormData] = useState(student || { 
    name: "", 
    email: "", 
    phone: "", 
    gender: "", 
    department: "" 
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = students.some(
      (s) => (s.email === formData.email || s.phone === formData.phone) && s.id !== student.id
    );
    if (isDuplicate) {
      setError("Email or Phone already exists!");
      return;
    }
    
    dispatch(editStudent(formData));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h1>Update Student</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required minLength={3} placeholder="Name" />
          
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
          
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required pattern="\d{10}" placeholder="Phone (10 digits)" />
          
          <div className="gender-container">
            <label>Gender:</label>
            <label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
            </label>
            <label>
              <input type="radio" name="gender" value="Transgender" checked={formData.gender === "Transgender"} onChange={handleChange} /> Transgender            
              </label>
          </div>

          <select name="department" placeholder="Department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>

          <div className="button-group">
            <button type="submit" className="update-btn">Update</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentForm;
