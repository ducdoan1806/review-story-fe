import { Link } from "react-router-dom";
import "../assets/css/register.css";
const Register = () => {
  return (
    <div className="register">
      <div className="register__inputGroup">
        <label htmlFor="password">Tên của bạn</label>
        <input
          type="text"
          id="name"
          placeholder="Nhập tên"
          autoComplete={false}
        />
      </div>
      <div className="register__inputGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Nhập địa chỉ email"
          autoComplete={false}
        />
      </div>
      <div className="register__inputGroup">
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
        Bạn đã có tài khoản ?
        <Link to={"/auth/login"}>
          <b> Đăng nhập</b>
        </Link>
      </p>
    </div>
  );
};

export default Register;
