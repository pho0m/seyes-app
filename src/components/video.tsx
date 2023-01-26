import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoRender: React.FC<VideoFeedProps> = ({ src }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState<ReturnType<typeof videojs>>();

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      setPlayer(
        videojs(videoElement, {}, () => {
          console.log("player is ready");
        })
      );
    }
  }, [videoRef]);

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <div>
      <video className="video-js" ref={videoRef} controls>
        <source
          src={
            src
            //"http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8"
          }
          type="application/x-mpegURL"
        />
      </video>
    </div>
  );
};

interface VideoFeedProps {
  src: string;
}

export default VideoRender;
