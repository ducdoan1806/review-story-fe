import "../assets/css/spinLoading.css";
import PropTypes from "prop-types";

const SpinLoading = ({ size, background }) => {
  return (
    <div style={{ width: size, background }} className="spinLoading"></div>
  );
};
SpinLoading.propTypes = {
  size: PropTypes.number,
  background: PropTypes.string,
};
export default SpinLoading;
