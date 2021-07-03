import classes from './Notification.module.css';

const Notification = (props) => {
    return <div className={classes.container}>
        <div className={classes.text}>{props.notification.title}</div>
        <div className={classes.text}>{props.notification.message}</div>
    </div>
}

export default Notification;