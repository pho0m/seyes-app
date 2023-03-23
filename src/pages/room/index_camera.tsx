import { Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { env } from "../../components/helper";
import VideoRender from "../../components/video";

const width = "100%";
const height = "100%";

export interface RoomData {
  id: number;
  label: string;
  cam_url: string;
}

//FIXME make dynamic function
export default function IndexCameraPage() {
  let cameraBoxsData: RoomData[] = [
    {
      id: 0,
      label: "702",
      cam_url:
        env.VITE_RTSP_URL +
        "/stream/c319f57f-6db1-4ada-9ca4-f0fdb38c13f2/channel/0/hlsll/live/index.m3u8",
    },

    // http://202.44.35.76:9093/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/hlsll/live/index.m3u8

    {
      id: 1,
      label: "709",
      cam_url:
        env.VITE_RTSP_URL +
        "/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/hls/live/index.m3u8",
    },
    // {
    //   id: 2,
    //   label: "704",
    //   cam_url:
    //     env.VITE_RTSP_URL +
    //     "/stream/7eee1e15-4ca4-4e80-80cd-71b368bdb551/channel/0/hls/live/index.m3u8",
    // },
  ];

  //FIXME dynamic with api
  // cameraBox = [
  //   {
  //     id: 0,
  //     label: "702",
  //   },
  //   {
  //     id: 1,
  //     label: "703",
  //   },
  //   {
  //     id: 2,
  //     label: "704",
  //   },
  // ];

  const CamBox = ({ values }) => (
    <>
      {values.map((value: any) => (
        <Col xs={24} xl={7} style={{ margin: 5 }}>
          <Link
            to={{
              pathname: `/cameras/${value.id + 1}`,
            }}
            state={{ roomData: value }}
          >
            <Card
              title="Live Camera in room"
              hoverable={true}
              bordered={true}
              style={{ height: height, width: width }}
            >
              <center>
                <VideoRender src={value.cam_url} isControl={false} />
                <Title level={1}>{value.label}</Title>
              </center>
            </Card>
          </Link>
        </Col>
      ))}
    </>
  );

  return (
    <>
      <Row>
        <CamBox values={cameraBoxsData} />
      </Row>
    </>
  );
}