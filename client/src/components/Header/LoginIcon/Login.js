import classes from "./Login.module.css";
const Login = () => {

  return (
    <div className={classes.container}>
      <div className={classes.loginBtn}>
        <span>
          <i className={`fas fa-sign-in-alt ${classes.icon}`}></i>
        </span>
        <span >Login</span>
      </div>
    </div>
  );
};

export default Login;
