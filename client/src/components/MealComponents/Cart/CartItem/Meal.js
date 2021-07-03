import classes from "./Meal.module.css";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../../store/MealStore/cart-items";
import { addItemToCart, removeItemFromCart, setCartItems } from "../../Api/ApiFunction";
import BtnLoading from "../../../loading/BtnLoading";

const Meal = (props) => {
  const dispatch = useDispatch();
  const availableMeals = useSelector(
    (state) => state.AvailableMeals.availableMeals
  );
  const [showLoading, setShowLoading] = useState(false);
  let meal = {};
  for (let key in availableMeals) {
    if (availableMeals[key]._id === props.meal.mealId) {
      meal = availableMeals[key];
    }
  }
  const addItemHandler = async () => {
    setShowLoading(true);
    const data = await addItemToCart({ meal, value: 1 });
    if (data.success) {
      const cartItem = await setCartItems();
      if (cartItem.success) {
        dispatch(
          cartActions.setCartItem({
            items: cartItem.items,
            totalAmount: cartItem.totalAmount,
          })
        );
      }
    }
    setShowLoading(false)
  };
  const removeItemHandler = async () => {
    setShowLoading(true)
    const data = await removeItemFromCart({ meal, value: 1 });
    if (data.success) {
      const cartItem = await setCartItems();
      if (cartItem.success) {
        dispatch(
          cartActions.setCartItem({
            items: cartItem.items,
            totalAmount: cartItem.totalAmount,
          })
        );
      }
    }
    setShowLoading(false);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.mealdata}>
          <div className={classes.title}>{meal.title}</div>
          <div className={classes.price}>
            <span className={classes.p}>price : {meal.price}$</span>
            <span className={classes.amount}>{props.meal.quantity} x</span>
          </div>
        </div>
        <div className={classes.mealform}>
          {showLoading && <BtnLoading />}
          {!showLoading && (
            <div className={classes.icon}>
              <span onClick={removeItemHandler}>
                <i className={`fas fa-minus ${classes.minus}`}></i>
              </span>
              <span onClick={addItemHandler}>
                <i className={`fas fa-plus ${classes.plus}`}></i>
              </span>
            </div>
          )}
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

export default Meal;
