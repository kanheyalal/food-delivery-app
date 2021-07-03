import { createSlice } from '@reduxjs/toolkit';

const AvailableMeals = createSlice({
    name: "AvailableMeals",
    initialState: {
        availableMeals: []
    },
    reducers:{
        storeAvailableMeals(state, action) {
            const availableMeals = action.payload;
            state.availableMeals = availableMeals;
        }
    },
});

export const availableMealsActions = AvailableMeals.actions;
export default AvailableMeals;