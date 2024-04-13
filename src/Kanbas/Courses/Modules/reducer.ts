import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    modules: [],
    newModule: { name: "New Module 123", description: "New Description" }
}

const moduleSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
		setModules: (state, action) => {
			state.modules = action.payload
		},
        addModule: (state, action) => {
            state.modules = [
                { ...action.payload},
                ...state.modules
            ];
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(module => module._id !== action.payload);
        },
        updateModule: (state, action) => {
            state.modules = state.modules.map(module => module._id === action.payload._id ? action.payload : module);
        },
        setNewModule: (state, action) => {
            state.newModule = action.payload;
        }
    }
})

export const { addModule, deleteModule, updateModule, setNewModule, setModules } = moduleSlice.actions;
export default moduleSlice.reducer;
