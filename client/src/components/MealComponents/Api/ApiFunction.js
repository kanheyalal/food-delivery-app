import axios from "axios";
import { availableMealsActions } from "../../../store/MealStore/AvailabelMeals";

export const fetchAvailableMeals = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/getmeals");
      const data = await response.data.meals;
      return data;
    };
    try {
      const availableMeals = await fetchData();
      const array = [];
      for (let key in availableMeals) {
        array.push(availableMeals[key]);
      }
      dispatch(availableMealsActions.storeAvailableMeals(array));
    } catch (err) {
      console.log("Error in available meal fetching");
    }
  };
};
export const addItemToCart = async (props) => {
  const { meal, value } = props;
  const email = localStorage.getItem('email');
  let data = {
      message : "",
      success: false,
  }
  try {
    const res = await axios.patch("http://localhost:8000/updatecart", {
      mealId: meal._id,
      mealPrice: meal.price,
      email,
      operation: "add",
      amount: value,
    });
    if(res.status === 200) {
        data.message = res.data.message;
        data.success = true;
    }
  } catch (err) {
      data.message = err.response.data.error;
  }
  return data;
};

export const removeItemFromCart = async (props) => {
    const { meal, value } = props;
    const email = localStorage.getItem('email')
    let data = {
        message : "",
        success: false,
    }
    try {
      const res = await axios.patch("http://localhost:8000/updatecart", {
        mealId: meal._id,
        mealPrice: meal.price,
        email,
        operation: "remove",
        amount: value,
      });
      if(res.status === 200) {
          data.message = res.data.message;
          data.success = true;
      }
    } catch (err) {
        data.message = err.response.data.error;
    }
    return data;
  };
export const setCartItems = async () => {
  const email = localStorage.getItem("email");
  let data = {
    items: [],
    success: false,
    message: '',
    totalAmount: 0,
  }
  if(email === null) {
    return data;
  }
  try{
    const res = await axios.get(`http://localhost:8000/getcartdata/${email}`);
    if(res.status === 200) {
      data.items = res.data.mealIds;
      data.success = true;
      data.message = res.data.message;
      data.totalAmount = res.data.totalAmount;
    }
  } catch(err) {
   if(err.response.data.error){
    data.message = err.response.data.error
    } else {
      data.message = 'net disconnected';
    }
    
  }
  return data;
}
