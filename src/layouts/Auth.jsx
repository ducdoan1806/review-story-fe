import { Outlet } from "react-router-dom";
import "../assets/css/auth.css";
import logo from "../assets/images/logo-dark.png";

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__img">
          <img width={214} height={40} src={logo} alt="" />
        </div>
        <div className="auth__form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
