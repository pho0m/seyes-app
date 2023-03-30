import { Button, Card, Col, Row, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import VideoRender from "../../components/video";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetRoom } from "../../api/room";
export const env = import.meta.env;

const width = "100%";
const height = "100%";

export interface RoomData {
  id: number;
  label: string;
  cam_url: string;
  uuid_cam: string;
}

//FIXME make dynamic function
export default function IndexCameraPage() {
  const [createroom, setCreateRoom] = useState(true);
  const roomdata: RoomData[] = [];
  const [resdata, setResdata] = useState() as any;

  // let cameraBoxsData: RoomData[] = [
  //   {
  //     id: 1,
  //     label: "702",
  //     cam_url:
  //       env.VITE_RTSP_URL +
  //       "/stream/c319f57f-6db1-4ada-9ca4-f0fdb38c13f2/channel/0/hlsll/live/index.m3u8",
  //     uuid_cam: "c319f57f-6db1-4ada-9ca4-f0fdb38c13f2",
  //   },

  //   {
  //     id: 2,
  //     label: "709",
  //     cam_url:
  //       env.VITE_RTSP_URL +
  //       "/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/hls/live/index.m3u8",
  //     uuid_cam: "27aec28e-6181-4753-9acd-0456a75f0289",
  //   },
  // ];

  useEffect(() => {
    (async () => {
      const res = await GetRoom();
      setResdata(res);
      console.log("room", res);
    })();
  }, [createroom]);

  if (!resdata) {
    return <>Loading</>; //for loading
  }

  let reportdata = resdata.items.map((v) => {
    roomdata.push({
      id: v.id,
      label: v.label,
      cam_url: v.cam_url,
      uuid_cam: v.uuid_cam,
    });
  });

  const CamBox = ({ values }) => (
    <>
      {values.map((value: any) => (
        <Col xs={24} xl={7} style={{ margin: 5 }}>
          <Link
            to={{
              pathname: `/cameras/${value.id}`,
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

  const onMenuClick = (e: boolean) => {
    setCreateRoom(e);
  };

  const onFinish = async (values: any) => {
    console.log(values.camuuid);

    const res = await axios({
      method: "post",
      url: env.VITE_BASE_URL + "/rooms/new",
      data: {
        active: true,
        label: values.roomlabel,
        cam_url: values.camurl,
        uuid_cam: values.camuuid,
      },
    });
    setCreateRoom(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {createroom ? (
        <>
          <Button
            type="primary"
            style={{
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
            onClick={() => onMenuClick(false)}
          >
            Create Room
          </Button>
          <Row>
            <CamBox values={roomdata} />
          </Row>
        </>
      ) : (
        <>
          <Button
            style={{
              margin: 10,
              color: "white",
              backgroundColor: "red",
              border: "1px solid #C0C0C0",
            }}
            onClick={() => onMenuClick(true)}
          >
            Cancel
          </Button>

          <Card
            title="Create Room"
            hoverable={true}
            bordered={false}
            style={{
              minHeight: "20vh",
              minWidth: "37vh",
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Room Label"
                name="roomlabel"
                rules={[
                  {
                    required: true,
                    message: "Please input your Room Label!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Camera URL"
                name="camurl"
                rules={[
                  {
                    required: true,
                    message: "Please input your Camera URL!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Camera UUID"
                name="camuuid"
                rules={[
                  {
                    required: true,
                    message: "Please input your Camera UUID!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}
