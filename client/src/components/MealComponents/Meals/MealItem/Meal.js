import classes from "./Meal.module.css";
import MealItem from "./MealItem";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../../store/MealStore/cart-items";
import { addItemToCart, setCartItems } from "../../Api/ApiFunction";
import BtnLoadding from "../../../loading/BtnLoading";
import { useHistory } from "react-router-dom";

const Meal = (props) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.UserData.email);
  const [value, setValue] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const isLoggedIn = useSelector(state => state.AuthUser.isLoggedIn);
  const history = useHistory();

  const addItemHandler = async () => {
    if (value > 0) {
      if(!isLoggedIn) {
        history.push('/login');
        return;
      }
      setShowLoading(true);
      const data = await addItemToCart({ meal: props.meal, value, email });
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
    }
    setValue(0);
  };

  const increaseItemHandler = () => {
    if (value < 5) {
      setValue((prevState) => prevState + 1);
    }
  };
  const decreaseItemHandler = () => {
    if (value > 0) {
      setValue((prevState) => prevState - 1);
    }
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.mealItem}>
          <MealItem meal={props.meal} />
        </div>
        <div className={classes.input}>
          <div className={classes.icon}>
            <span className={classes.remove} onClick={decreaseItemHandler}>
              <i className="fas fa-minus"></i>
            </span>
            <span className={classes.box}>{value}</span>
            <span className={classes.add} onClick={increaseItemHandler}>
              <i className="fas fa-plus"></i>
            </span>
          </div>
          {showLoading && <BtnLoadding />}
          {!showLoading && (
            <div className={classes.btnDiv}>
              <button className={classes.button} onClick={addItemHandler}>
                Add
              </button>
            </div>
          )}
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

export default Meal;
