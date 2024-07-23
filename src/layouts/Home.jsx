import { Outlet } from "react-router-dom";
import "../assets/css/home.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserApi } from "../features/auth/authApi";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserApi());
  }, [dispatch]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 p-3 gap-3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
