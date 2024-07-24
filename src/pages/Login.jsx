import { Link, Navigate } from "react-router-dom";
import "../assets/css/login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../features/auth/authApi";
import { isAuthenticated } from "../utils/utils";
import Loading from "../components/Loading";
const Login = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ email: "", password: "" });
  const {
    error: authError,
    loaded: loadedAuth,
    loading,
  } = useSelector((state) => state.auth);
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    dispatch(
      loginApi({ email: info.email.trim(), password: info.password.trim() })
    );
  };
  return (
    <div className="login">
      {(loadedAuth || isAuthenticated()) && <Navigate to="/" />}
      <div className="login__inputGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Nhập địa chỉ email"
          onChange={handleInfo}
          value={info.email}
          onKeyDown={(e) => {
            e.key === "Enter" && handleLogin();
          }}
        />
      </div>
      <div className="login__inputGroup">
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Nhập mật khẩu"
          onChange={handleInfo}
          value={info.password}
          onKeyDown={(e) => {
            e.key === "Enter" && handleLogin();
          }}
        />
      </div>
      {authError && <p style={{ color: "red" }}>{authError}</p>}

      <button onClick={!loading ? handleLogin : () => {}}>
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          "Đăng nhập"
        )}
      </button>
      <p>
        Bạn chưa có tài khoản ?
        <Link to={"/auth/register"}>
          <b> Đăng kí</b>
        </Link>
      </p>
    </div>
  );
};

export default Login;
