import { Link } from "react-router-dom";
import "../assets/css/header.css";
import Dropdown from "./Dropdown";
import { useState } from "react";
import avatar from "../assets/images/avatar-1.jpg";

const Header = () => {
  const [isDrop, setIsDrop] = useState(false);
  const [isDropUser, setIsDropUser] = useState(false);
  const handleDropdown = () => {
    setIsDrop(!isDrop);
  };
  const handleDropdownUser = () => {
    setIsDropUser(!isDropUser);
  };
  return (
    <div className="header">
      <div className="header__newProject">
        <button onClick={handleDropdown}>+ Thêm mới dự án</button>
        {isDrop && (
          <Dropdown handleDropdown={handleDropdown} style={{ top: 40 }}>
            <Link
              to={"/picture-project"}
              onClick={() => {
                setIsDrop(false);
              }}
              className="dropdown__item"
            >
              + Dự án hình ảnh
            </Link>
            <Link
              to={"/"}
              className="dropdown__item"
              onClick={() => {
                setIsDrop(false);
              }}
            >
              + Dự án video
            </Link>
          </Dropdown>
        )}
      </div>
      <div className="relative">
        <div className="header__user" onClick={handleDropdownUser}>
          <img width={36} height={36} src={avatar} alt="" />
          <span>Admin</span>
        </div>
        {isDropUser && (
          <Dropdown handleDropdown={handleDropdownUser} style={{ right: 0 }}>
            <button className="dropdown__item">Đăng xuất</button>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Header;
