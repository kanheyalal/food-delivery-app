import { createSlice } from '@reduxjs/toolkit';

const ShowCart = createSlice({
    name: "showcart",
    initialState: {
        showCart: false,
    },
    reducers: {
        cartVisibility(state, action) {
            state.showCart = !state.showCart;
        }
    }
});

export const showCartActions = ShowCart.actions;
export default ShowCart;