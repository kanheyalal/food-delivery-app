import classes from "./AvailableMeals.module.css";
import Meal from "./MealItem/Meal";
import { useSelector } from "react-redux";

const AvailableMeals = () => {
  const availabeMeals = useSelector((state) => state.AvailableMeals.availableMeals);
  let Meals = [];
  Meals = availabeMeals.map((meal) => {
    return <Meal key={Math.random()} meal={meal}></Meal>;
  });

  return (
    <div className={classes.container}>
      {Meals.length !== 0 && <div className={classes.meals}>{Meals}</div>}
    </div>
  );
};

export default AvailableMeals;
