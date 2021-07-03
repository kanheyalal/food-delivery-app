import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import CartIcon from "./CartIcon/CartIcon";
import LoginPage from "./LoginIcon/Login";
import { Link } from 'react-router-dom'
const Header = () => {
  const isLoggedIn = useSelector((state) => state.AuthUser.isLoggedIn);

  return (
    <div className={classes.conatiner}>
      <div className={classes.Logo}><Link to="/">Rapid Meals</Link></div>

      <div className={classes.btnDiv}>
       {/* { isLoggedIn && <Link to="/"> <CartIcon/></Link>} */}
       { isLoggedIn && <CartIcon/>}
       { !isLoggedIn && <Link to='/login'><LoginPage/></Link>}
        
      </div>
    </div>
  );
};

export default Header;
