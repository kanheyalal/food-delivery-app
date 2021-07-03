import { useEffect, useRef } from "react";
import lottie from 'lottie-web';
import classes from './Home.module.css'

const Home = () => {
    const container = useRef();
    useEffect(() => {
        lottie.loadAnimation({
          container: container.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("./photo.json"),
        });
      }, []);

    return <div className={classes.containe}>
        <div className={classes.text}>
            <div className={classes.head}>The food at your doorstep</div>
            <div className={classes.quote}>Why starve when you have us</div>
        </div>
        <div className={classes.image}>
          <div className="container" ref={container}></div>
        </div>
    </div>
};

export default Home;