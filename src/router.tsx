import { Routes, Route } from "react-router-dom";
import CameraPage from "./pages/camera/camera";
import HomePage from "./pages/home/home";
import ReportPage from "./pages/report/report";
import SettingsPage from "./pages/setting/setting";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
