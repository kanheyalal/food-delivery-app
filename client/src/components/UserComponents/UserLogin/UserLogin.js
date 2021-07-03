import { useRef, useState } from "react";
import classes from "./UserLogin.module.css";
import LoginImg from "./login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthUserActions } from "../../../store/UserStore/Auth-User";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, signUp } from "../UserApi/Api";
import { UserDataActions } from '../../../store/UserStore/user-data';
import { cartActions } from '../../../store/MealStore/cart-items';
import { setCartItems } from '../../MealComponents/Api/ApiFunction';

const UserLogin = () => {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const number = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  const errorMessage = (message) => {
    toast.error(message, {
      position: "top-center",
    });
  };

  const successMessage = (message) => {
    toast.dark(message, {
      position: "top-center",
    });
  };

  const changeLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    if (isLogin) {
      const data = await login({ enteredEmail, enteredPassword });
      if (data.success) {
        dispatch(AuthUserActions.setToken({ token: data.token, userData: data.userData }));
        dispatch(UserDataActions.setUserData());
        dispatch(AuthUserActions.login());
        const cartItem = await setCartItems();
        if(cartItem.success) {
          dispatch(cartActions.setCartItem({items:cartItem.items}));
        }
        history.push("/");
      } else {
        errorMessage(data.message);
      }
    } else {
      const enteredName = name.current.value;
      const enteredNumber = number.current.value;
      const data = await signUp({ enteredEmail, enteredPassword , enteredName, enteredNumber });
      if(data.success) {
        successMessage(data.message);
        email.current.value = "";
        password.current.value = "";
        name.current.value = "";
        number.current.value = "";
        setIsLogin(true);
      } else {
        errorMessage(data.message);
      }
    }
  };

  return (
    <div className={classes.container}>
      <ToastContainer />
      <div className={classes.context}>
        <div className={classes.image}>
          <img src={LoginImg} alt="login" />
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <div className={classes.head}>{isLogin ? "Login" : "Sign Up"}</div>
            <form onSubmit={formSubmitHandler}>
              {!isLogin && (
                <div className={classes.inputs}>
                  <input
                    type="text"
                    ref={name}
                    required
                    placeholder="enter name"
                  />
                </div>

              )}
              {!isLogin && (
                <div className={classes.inputs}>
                  <input
                    type="text"
                    ref={number}
                    required
                    placeholder="enter number"
                  />
                </div>

              )}

              <div className={classes.inputs}>
                <input
                  type="email"
                  ref={email}
                  required
                  placeholder="enter email"
                />
              </div>
              <div className={classes.inputs}>
                <input
                  type="password"
                  ref={password}
                  required
                  placeholder="enter password"
                />
              </div>

              <div className={classes.btndiv}>
                <button className={classes.btn}>
                  {isLogin ? "Login" : "Sign up"}
                </button>
              </div>
            </form>
            <div className={classes.sign}>
              {isLogin && (
                <p className={classes.singup}>
                  don't have an account
                  <span
                    className={classes.singupBtn}
                    onClick={changeLoginHandler}
                  >
                    sign in
                  </span>
                </p>
              )}
              {!isLogin && (
                <p className={classes.singup}>
                  already have an account
                  <span
                    className={classes.singupBtn}
                    onClick={changeLoginHandler}
                  >
                    login
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
