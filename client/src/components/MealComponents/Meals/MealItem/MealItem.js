import classes from "./MealItem.module.css";

const MealItem = (props) => {
  // console.log(props);
  return (
    <div className={classes.container}>
      <div className={classes.title}>{props.meal.title}</div>
      <div className={classes.description}>{props.meal.description}</div>
      <div className={classes.price}>price : {props.meal.price}$</div>
    </div>
  );
};

export default MealItem;
