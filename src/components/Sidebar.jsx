import { Link } from "react-router-dom";
import "../assets/css/sidebar.css";
import logo from "../assets/images/logo-dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__img">
        <img width={214} height={40} src={logo} alt="" />
      </div>
      <div className="sidebar__title">MENU</div>
      <ul>
        <li>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} /> <span>Trang chủ</span>
          </Link>
        </li>
        <li>
          <Link to={"/picture-project"}>
            <FontAwesomeIcon icon={faImage} /> <span>Dự án hình ảnh</span>
          </Link>
        </li>
        <li>
          <Link to={"#"}>
            <FontAwesomeIcon icon={faVideo} /> <span>Dự án video</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
