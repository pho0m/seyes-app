import VideoRender from "../../components/video";

export default function ReportPage() {
  return (
    <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
  );
}
