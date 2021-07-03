import { useEffect, useRef } from "react";
import lottie from 'lottie-web';
import classes from './Loading.module.css'
import React, { Fragment } from "react";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  const container = useRef();
  useEffect(() => {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("./loading.json"),
      });
    }, []);
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <div className={classes.container}>
          <div className={classes.image}>
              <div className="container" ref={container}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
