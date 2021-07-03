import Home from '../components/MealComponents/Home/Home';
import AvailableMeals from "../components/MealComponents/Meals/AvailableMeals";
import Cart from '../components/MealComponents/Cart/Cart';
import { useSelector } from "react-redux";
import Notification from "../components/MealComponents/UI/Notification/Notification";

const Meals = () => {
  const showCart = useSelector(state => state.ShowCart.showCart);
  const notification = useSelector(state => state.UiSlice.notification);


  return (
    <div>
      {notification && <Notification notification={notification}/>}
        { showCart && <Cart /> }
        <Home />
        <AvailableMeals />

    </div>
  );
};

export default Meals;