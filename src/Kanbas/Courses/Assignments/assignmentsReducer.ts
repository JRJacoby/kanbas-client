import { createSlice } from '@reduxjs/toolkit';

const today = new Date().toISOString().split('T')[0]

const initialState = {
    assignments: [],
    assignment: { _id: "NewAssignment", title: "New Assignment", course: "0", description: "", points: 0, dueDate: today, availableFromDate: today, availableUntilDate: today}
}

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
		setAssignments: (state, action) => {
			state.assignments = action.payload
		},
        addAssignment: (state, action) => {
            state.assignments = [
                { ...action.payload, _id: new Date().getTime().toString() },
                ...state.assignments
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(assignment => assignment._id !== action.payload);
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map(assignment => assignment._id === action.payload._id ? action.payload : assignment);
        },
        selectAssignment: (state, action) => {
            state.assignment = action.payload;
        }
    }
})

export const { addAssignment, deleteAssignment, updateAssignment, selectAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
