import { useRef } from "react";
import "../assets/css/modal.css";
import PropTypes from "prop-types";
import { useOutside } from "../utils/utils";
const Modal = ({ children, title, handleOpen }) => {
  const modalRef = useRef(null);
  useOutside(modalRef, handleOpen);
  return (
    <div className="modal">
      <div className="modal__box" ref={modalRef}>
        <div className="modal__header">
          <span>{title}</span>
          <button onClick={handleOpen}>✕</button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  handleOpen: PropTypes.func,
};
export default Modal;
