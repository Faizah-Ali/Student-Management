import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../redux/studentSlice";
import "./css/AddStudentForm.css"; 

const AddStudentForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [student, setStudent] = useState({
    id: Date.now(),
    name: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (student.name.trim().length < 3)
      errors.name = "Name must be at least 3 characters";
    if (!/^\S+@\S+\.\S+$/.test(student.email))
      errors.email = "Invalid email format";
    if (!/^\d{10}$/.test(student.phone))
      errors.phone = "Phone must be 10 digits";
    if (!student.gender) errors.gender = "Please select gender";
    if (!student.department)
      errors.department = "Please select department";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Submitting student:", student); 
    dispatch(addStudent(student));
    onClose();
  };
  

  return (
    <div className="add-form">
      <div className="add-form-content">
        <h1>Add Student</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
            {errors.name && <span className="add-form-error">{errors.name}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
            />
            {errors.email && <span className="add-form-error">{errors.email}</span>}
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="add-form-error">{errors.phone}</span>}
          </div>
          <div className="gender-grp">
            <label style={{ fontWeight: "600" }}>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={student.gender === "Male"}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={student.gender === "Female"}
              />
              Female
            </label>
            <label>
            <input
                type="radio"
                name="gender"
                value="Transgender"
                onChange={handleChange}
                checked={student.gender === "Transgender"}
              />
              Transgender
            </label>
            {errors.gender && <span className="add-form-error">{errors.gender}</span>}
          </div>
          <div>
            <label>Department:</label>
            <select
              name="department"
              value={student.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
            {errors.department && (
              <span className="add-form-error">{errors.department}</span>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <button type="submit" className="add-form-add-btn">Add</button>
            <button type="button" className="add-form-cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
