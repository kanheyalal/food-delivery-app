import "./App.css";
import Meals from "./PAGES/MEALS";
import User from "./PAGES/USERS";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthUserActions } from "./store/UserStore/Auth-User";
import { UserDataActions } from "./store/UserStore/user-data";
import { cartActions } from "./store/MealStore/cart-items";
import { setCartItems } from "./components/MealComponents/Api/ApiFunction";
import { fetchAvailableMeals } from './components/MealComponents/Api/ApiFunction';
import Delivery from "./components/Delivery/Delivery";
import Cart from "./components/MealComponents/Cart/Cart";
import Loading from './components/loading/Loading';

// check user api 42 line

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ShowCart.showCart);
  const isLoggedIn = useSelector(state => state.AuthUser.isLoggedIn);
  const availableMeals = useSelector(state => state.AvailableMeals.availableMeals);

  useEffect(() => {
    dispatch(AuthUserActions.login());
    dispatch(UserDataActions.setUserData());
    const getCartItems = async () => {
      const res = await setCartItems();
      if (res.success) {
        dispatch(cartActions.setCartItem({ items: res.items, totalAmount: res.totalAmount }));
      }
    };
    getCartItems();
  }, [dispatch, isLoggedIn]);
  
  useEffect(()=>{
    dispatch(fetchAvailableMeals());
  },[dispatch])
  return (
    <>
      <Header />
      {availableMeals.length === 0 &&   <Loading/>}
      {showCart && <Cart />}
      <Switch>
        <Route path="/" exact>
          <Meals />
        </Route>
        <Route path="/login">
          <User />
        </Route>
        <Route path="/delivery">
          <Delivery />
        </Route>
      </Switch>
    </>
  );
}

export default App;
