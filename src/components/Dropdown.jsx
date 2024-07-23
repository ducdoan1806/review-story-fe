import "../assets/css/dropdown.css";
import PropTypes from "prop-types";
import { useOutside } from "../utils/utils";
import { useRef } from "react";
const Dropdown = ({ children, style, handleDropdown }) => {
  const dropDownRef = useRef(null);
  useOutside(dropDownRef, handleDropdown);
  return (
    <div ref={dropDownRef} className="dropdown" style={style}>
      {children}
    </div>
  );
};
Dropdown.propTypes = {
  children: PropTypes.func,
  style: PropTypes.object,
  handleDropdown: PropTypes.func,
};
export default Dropdown;
