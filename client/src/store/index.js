import { configureStore } from '@reduxjs/toolkit';
import AvailableMeals from './MealStore/AvailabelMeals';
import cartItems from './MealStore/cart-items';
import ShowCart from './MealStore/show-cart';
import UiSlice from './MealStore/ui-slice';
import AuthUser from './UserStore/Auth-User';
import UserData from './UserStore/user-data';

const store = configureStore({
    reducer: {
        AvailableMeals: AvailableMeals.reducer,
        CartItems: cartItems.reducer,
        ShowCart : ShowCart.reducer,
        UiSlice: UiSlice.reducer,
        AuthUser: AuthUser.reducer,
        UserData : UserData.reducer
    }
});

export default store;