import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import classes from "./BtnLoading.module.css";
const BtnLoading = () => {
  const container = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./button.json"),
    });
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <div className="container" ref={container}></div>
      </div>
    </div>
  );
};

export default BtnLoading;
