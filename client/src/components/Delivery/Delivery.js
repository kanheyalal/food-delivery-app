import { useSelector } from "react-redux";
import classes from "./Delivery.module.css";
import Img from "./photo.jpg";

const Delivery = () => {
  const cartItems = useSelector((state) => state.CartItems.items);
  const availableMeals = useSelector(
    (state) => state.AvailableMeals.availableMeals
  );
  let totalAmount = 0;
  for (let key in cartItems) {
    for (let id in availableMeals) {
      if (cartItems[key].mealId === availableMeals[id]._id) {
        totalAmount += availableMeals[id].price * cartItems[key].quantity;
      }
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.imgContainer}>
          <img src={Img} className={classes.image} alt="deliveryImage"/>
        </div>
        <div className={classes.formContainer}>
          <form>
            <div className={classes.price}><label>Total Price : {totalAmount} $</label></div>
            <div className={classes.inputContainer}>
                <input type="text" className={classes.input} placeholder="enter address" />
            </div>
            <div className={classes.inputContainer}>
                <input type="number" className={classes.input} placeholder="enter pincode" />
            </div>
            <div className={classes.btnContainer}>
                <button className={classes.btn}>Place order</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
