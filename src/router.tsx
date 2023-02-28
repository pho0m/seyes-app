import { Routes, Route } from "react-router-dom";
import IndexCameraPage from "./pages/camera/index_camera";
import SingleCameraPage from "./pages/camera/single_camera";
import HomePage from "./pages/home/home";
import ReportPage from "./pages/report/report";
import IndexUserPage from "./pages/users/index_user";
import SingleUserPage from "./pages/users/single_user";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analytics" element={<HomePage />} />
      <Route path="/cameras" element={<IndexCameraPage />} />
      <Route path="/cameras/:id" element={<SingleCameraPage />} />
      <Route path="/reports" element={<ReportPage />} />
      {/* <Route path="/reports/:id" element={<SingleReportPage />} /> //*FIXME*/}
      <Route path="/users" element={<IndexUserPage />} />
      <Route path="/users/:id" element={<SingleUserPage />} />
    </Routes>
  );
}
