import CartItem from "./CartItem/CartItem";
import Modal from "../Cart/Modal/Modal";
import { showCartActions } from "../../../store/MealStore/show-cart";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Cart.module.css";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.CartItems.items);
  const totalQuantity = useSelector((state) => state.CartItems.totalQuantiy);
  const totalAmount = useSelector(state => state.CartItems.totalAmount);
  const dispatch = useDispatch();
  const changeCartVisibility = () => {
    dispatch(showCartActions.cartVisibility());
  };

  return (
    <Modal>
      <div className={classes.cartItems}>
        {cartItems.length !== 0 && <CartItem meals={cartItems} />}
        {cartItems.length === 0 && (
          <p>No items present. add some item to cart</p>
        )}
      </div>
      <div className={classes.btnDiv}>
        <span className={classes.price}>{`Total Price  :  ${totalAmount} $`}</span>
        <button  className={classes.btn} onClick={changeCartVisibility}>
          close
        </button>
        {totalQuantity !== 0 && <Link to='/delivery' onClick={changeCartVisibility} className={classes.btn}>order</Link>}
      </div>
    </Modal>
  );
};

export default Cart;
