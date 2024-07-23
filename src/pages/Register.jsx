import { Link, useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import { useState } from "react";
import http from "../app/http";
import Loading from "../components/Loading";
const Register = () => {
  const [register, setRegister] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleClickRegister = async () => {
    setLoading(true);
    try {
      const res = await http.post("register", JSON.stringify(register));
      if (res?.data?.message === "User registered successfully") {
        navigate("/auth/login");
      } else {
        setError("Lỗi");
      }
      setLoading(false);
    } catch (e) {
      setError(e?.response?.data?.error);
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="register__inputGroup">
        <label htmlFor="password">Tên của bạn</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nhập tên"
          onChange={handleRegister}
          value={register.name}
        />
      </div>
      <div className="register__inputGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Nhập địa chỉ email"
          value={register.email}
          onChange={handleRegister}
        />
      </div>
      <div className="register__inputGroup">
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Nhập mật khẩu"
          onChange={handleRegister}
          value={register.password}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={!loading && handleClickRegister}>
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          "Đăng ký"
        )}
      </button>
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
