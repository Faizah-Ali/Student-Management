import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent, editStudent } from "../redux/studentSlice";

const StudentForm = ({ studentToEdit, onClose }) => {
  const dispatch = useDispatch();

  const [student, setStudent] = useState(
    studentToEdit || {
      id: Date.now(),
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      department: "Science",
    }
  );

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (student.name.length < 3) return alert("Name must be at least 3 characters.");
    if (!/^\S+@\S+\.\S+$/.test(student.email)) return alert("Invalid email.");
    if (!/^\d{10}$/.test(student.phone)) return alert("Phone must be 10 digits.");

    if (studentToEdit) {
      dispatch(editStudent(student));
    } else {
      dispatch(addStudent(student));
    }

    onClose(); 
  };

  return (
    <div>
      <h2>{studentToEdit ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={student.phone} onChange={handleChange} required />

        <label>
          <input type="radio" name="gender" value="Male" checked={student.gender === "Male"} onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" checked={student.gender === "Female"} onChange={handleChange} />
          Female
        </label>

        <select name="department" value={student.department} onChange={handleChange}>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Arts">Arts</option>
        </select>

        <button type="submit">{studentToEdit ? "Update" : "Add"} Student</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default StudentForm;
