import { Routes, Route } from "react-router-dom";
import CameraPage from "./pages/camera/cameras";
import HomePage from "./pages/home/home";
import ReportPage from "./pages/report/report";
import UserPage from "./pages/users/users";
import SingleUser from "./pages/users/singleuser";
import SettingsPage from "./pages/setting/setting";
import SingleCameraPage from "./pages/camera/singlecamera";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analytics" element={<HomePage />} />
      <Route path="/cameras" element={<CameraPage />} />
      <Route path="/singlecamera" element={<SingleCameraPage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="/users" element={<UserPage />} />
      <Route path="/singleuser" element={<SingleUser />} />
    </Routes>
  );
}
