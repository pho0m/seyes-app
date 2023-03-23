import { Routes, Route } from "react-router-dom";
import IndexCameraPage from "./pages/room/index_camera";
import SingleCameraPage from "./pages/room/single_camera";
import HomePage from "./pages/home/home";
import ReportPage from "./pages/report/report";
import IndexUserPage from "./pages/users/index_user";
import SingleUserPage from "./pages/users/single_user";
import SettingsPage from "./pages/setting/setting";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analytics" element={<HomePage />} />
      <Route path="/rooms" element={<IndexCameraPage />} />
      <Route path="/cameras/:id" element={<SingleCameraPage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/users" element={<IndexUserPage />} />
      <Route path="/users/:id" element={<SingleUserPage />} />
    </Routes>
  );
}
