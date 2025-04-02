import { createSlice } from "@reduxjs/toolkit";

const loadStudents = () => {
  const storedStudents = localStorage.getItem("students");
  return storedStudents ? JSON.parse(storedStudents) : [];
};

const initialState = {
  list: loadStudents(),
};

const studentSlice = createSlice({
  name: "students",
  initialState, 
  reducers: {
    addStudent: (state, action) => {
      const { email, phone } = action.payload;

      const isDuplicate = state.list.some(
        (s) => s.email === email || s.phone === phone
      );

      if (isDuplicate) {
        alert("Error: Email or Phone already exists!"); 
        return; 
      }

      state.list.unshift(action.payload); 
      localStorage.setItem("students", JSON.stringify(state.list));
    },

    editStudent: (state, action) => {
      const { id, email, phone } = action.payload;

      
      const isDuplicate = state.list.some(
        (s) => (s.email === email || s.phone === phone) && s.id !== id
      );

      if (isDuplicate) {
        alert("Error: Email or Phone already exists!"); 
        return; 
      }

      const index = state.list.findIndex((s) => s.id === id);
      if (index !== -1) {
        state.list[index] = action.payload;
        localStorage.setItem("students", JSON.stringify(state.list));
      }
    },

    deleteStudent: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
      localStorage.setItem("students", JSON.stringify(state.list));
    },
  },
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
