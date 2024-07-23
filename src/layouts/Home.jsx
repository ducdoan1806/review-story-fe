import { Outlet } from "react-router-dom";
import "../assets/css/home.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
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
