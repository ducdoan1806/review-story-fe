import { Link } from "react-router-dom";
import "../assets/css/login.css";
const Login = () => {
  return (
    <div className="login">
      <div className="login__inputGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Nhập địa chỉ email"
          autoComplete={false}
        />
      </div>
      <div className="login__inputGroup">
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu"
          autoComplete={false}
        />
      </div>
      <button type="submit"> Đăng nhập</button>
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
