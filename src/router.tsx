import { Routes, Route } from "react-router-dom";
import CameraPage from "./pages/camera/camera";
import IndexCameraPage from "./pages/camera/index_camera";
import HomePage from "./pages/home/home";
import ReportPage from "./pages/report/report";
import SettingsPage from "./pages/setting/setting";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analytics" element={<HomePage />} />
      <Route path="/cameras" element={<IndexCameraPage />} />
      <Route path="/cameras/:id" element={<CameraPage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
