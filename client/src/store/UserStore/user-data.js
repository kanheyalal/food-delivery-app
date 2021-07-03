import {createSlice} from '@reduxjs/toolkit';

const UserData = createSlice({
    name: "UserData",
    initialState: {
        name: '',
        number: '',
        email: '',
    }, 
    reducers: {
        removeUserData(state, action) {
            state.name = '';
            state.databaseName = '';
            state.email ='';
        },
        setUserData(state, action) {
            const name = localStorage.getItem('name');
            const email = localStorage.getItem('email');
            const number = localStorage.getItem('number');
            state.name = name;
            state.email = email;
            state.name = number;
        }
    }
})

export const UserDataActions = UserData.actions;
export default UserData;