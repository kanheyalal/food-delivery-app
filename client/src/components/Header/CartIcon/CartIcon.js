import { useDispatch, useSelector } from "react-redux";
import { showCartActions } from "../../../store/MealStore/show-cart";
import { AuthUserActions } from '../../../store/UserStore/Auth-User';
import { UserDataActions } from '../../../store/UserStore/user-data';
import { cartActions } from '../../../store/MealStore/cart-items'
import classes from './CartIcon.module.css';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItemQuantity = useSelector((state) => state.CartItems.totalQuantiy);
  const changeShowCartHandler = () => {
    dispatch(showCartActions.cartVisibility());
  };
  const logoutHandler = () => {
    dispatch(UserDataActions.removeUserData());
    dispatch(cartActions.removeCartItem());
    dispatch(AuthUserActions.logout());
  }

  return (
    <div className={classes.container}>
      <div className={classes.logoutBtn} onClick={logoutHandler}>
        <span>
          <i className={`fas fa-sign-out-alt ${classes.logoutIcon}`}></i>
        </span>
        <span>Log out</span>
      </div>
    <div className={classes.cartBtn} onClick={changeShowCartHandler}>  
        <span>
          <i className={`fas fa-shopping-cart ${classes.icon}`}></i>
        </span>
        <span>Your cart</span>
        <span className={classes.number}>{cartItemQuantity}</span>
      </div>
      
    </div>
  );
};

export default CartIcon;
