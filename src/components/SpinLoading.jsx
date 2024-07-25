import "../assets/css/spinLoading.css";
import PropTypes from "prop-types";

const SpinLoading = ({ size }) => {
  return <div style={{ width: size }} className="spinLoading"></div>;
};
SpinLoading.propTypes = {
  size: PropTypes.number,
};
export default SpinLoading;
