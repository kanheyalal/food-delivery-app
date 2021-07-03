import Meal from "./Meal";
const CartItem = (props) => {
  const cartMeals = props.meals.map((meal) => {
    return <Meal key={Math.random()} meal={meal} />;
  });

  return <div>{cartMeals}</div>;
};

export default CartItem;
