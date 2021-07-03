import { createSlice } from '@reduxjs/toolkit'

const UiSlice = createSlice({
    name:"ui",
    initialState:{
        notification: null,
    },
    reducers: {
        showNotification(state, action) {
            state.notification={
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        }
    }
})
export const UiActions = UiSlice.actions;
export default UiSlice;