import { useEffect } from "react";
import "../assets/css/notification.css";
import PropTypes from "prop-types";
const Notification = ({ text, isError, close }) => {
  useEffect(() => {
    setTimeout(() => {
      close();
    }, 5000);
  }, [close]);
  return (
    <div className={"notification" + (isError ? " error" : " success")}>
      <p>{text}</p>
      <button onClick={close}>✕</button>
    </div>
  );
};
Notification.propTypes = {
  text: PropTypes.string,
  isError: PropTypes.bool,
  close: PropTypes.func,
};
export default Notification;
