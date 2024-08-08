import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./layouts/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./layouts/Home";
import Dashboard from "./pages/Dashboard";
import ImageProject from "./pages/ImageProject";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailImageProject from "./pages/DetailImageProject";
import VideoProject from "./pages/VideoProject";
import DetailVideoProject from "./pages/DetailVideoProject";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/picture-project" element={<ImageProject />} />
        <Route path="/picture-project/:id" element={<DetailImageProject />} />
        <Route path="/video-project" element={<VideoProject />} />
        <Route path="/video-project/:id" element={<DetailVideoProject />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth" element={<Navigate to={"/auth/login"} />} />
        <Route path="/auth/*" element={<Navigate to={"/auth/login"} />} />
      </Route>
    </Routes>
  );
}

export default App;
