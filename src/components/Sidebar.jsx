import { Link, useLocation } from "react-router-dom";
import "../assets/css/sidebar.css";
import logo from "../assets/images/logo-dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";

const sidebar = [
  { name: "Trang chủ", path: "/", icon: faHouse },
  { name: "Dự án hình ảnh", path: "/picture-project", icon: faImage },
  { name: "Dự án video", path: "/video-project", icon: faVideo },
];
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar__img">
        <img width={214} height={40} src={logo} alt="" />
      </div>
      <div className="sidebar__title">MENU</div>
      <ul>
        {sidebar.map((item) => (
          <li
            key={item.path}
            style={
              item.path.split("/")[1] === location.pathname.split("/")[1]
                ? { color: "#6d61ea" }
                : {}
            }
          >
            <Link to={item.path}>
              <FontAwesomeIcon icon={item?.icon} /> <span>{item?.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
