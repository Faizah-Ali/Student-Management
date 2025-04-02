import React, { useState } from "react";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      {showAddForm && (
        <AddStudentForm onClose={() => setShowAddForm(false)} />
      )}
      <StudentList onAddStudent={() => setShowAddForm(true)} />
    </div>
  );
}

export default App;
