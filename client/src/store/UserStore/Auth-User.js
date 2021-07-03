import { createSlice } from '@reduxjs/toolkit'

const AuthUser = createSlice({
    name: 'AuthUser',
    initialState: {
        idToken : '',
        isLoggedIn: false
    },
    reducers: {
        login(state, action) {
            const storedToken = localStorage.getItem('token');

            if(storedToken !== null) {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
            }
        },
        logout(state, action) {
            state.idToken = '';
            state.isLoggedIn = false;
            localStorage.removeItem('token')
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('number');
        },
        setToken(state, action) {
            state.idToken = action.payload.token;
            const userData = action.payload.userData;
            localStorage.setItem('token', state.idToken);
            localStorage.setItem('name', userData.name);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('number', userData.number);
        }
    }
})
export const AuthUserActions = AuthUser.actions;
export default AuthUser;