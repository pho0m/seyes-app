// @ts-ignore

import { Button, Card, Col, Form, Input, Row, Space, Switch } from "antd";
import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import VideoRender from "../../components/video";
import "video.js/dist/video-js.css";
import { useParams } from "react-router-dom";
import { GetSigleRoom } from "../../api/sigleroom";
export const env = import.meta.env;

export default function SigleCameraPage() {
  // const [isControl, setIsControl] = useState(false);

  const [resData, setResponsedata] = useState() as any;
  const [loading, setloading] = useState(true);
  const [editroom, setEditRoom] = useState(true);

  /////////////detect defualt //////////////////

  // const [person, setPerson] = useState(0);
  // const [comOn, setComOn] = useState(0);
  // const [accurency, setAccurency] = useState(0.0);
  // const [repordate, setReportData] = useState("");
  // const [reportime, setReportTime] = useState("");
  const [imgdetect, setImgDetect] = useState(
    "https://cloudfront-us-east-1.images.arcpublishing.com/gray/YQYT52JHZNAHHKCE35I77JB734.png"
  );

  // const rd: RoomData = roomData;
  // // const rtspCam = rd.cam_url;
  // const label = rd.label;

  const params = useParams();

  // console.log("param", params);

  const enterCapture = async () => {
    setloading(false);

    Swal.fire({
      title: "Wait a minute",
      html: `wait for capture and drawing container`,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axios({
        method: "GET",
        url: env.VITE_BASE_URL + `/detect/${params.id}`,
      });
      if (res.status === 200) {
        setImgDetect(res.data.image);

        Swal.fire({
          title: "Success",
          text: "Data have been sent",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Something went wrong!",
        text: `${err}`,
      });
      return;
    }
    setloading(true);
  };
  const Editroom = (e: boolean) => {
    setEditRoom(e);
  };

  const onEdit = async (values: any) => {
    console.log("values F", values);

    const res = await axios({
      method: "put",
      url: env.VITE_BASE_URL + `/rooms/edit/${params.id}`,
      data: {
        active: true,
        label: values.roomlabel,
        cam_url:
          env.VITE_RTSP_URL +
          `/stream/${values.camuuid}/channel/0/hls/live/index.m3u8`,
        uuid_cam: values.camuuid,
      },
    });
    Editroom(true);
  };

  const onEditFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    (async () => {
      const res = await GetSigleRoom(params.id);
      setResponsedata(res);

      console.log(resData);
    })();
  }, [editroom]);

  if (!resData) {
    return <>Loading</>; //for loading
  }

  return (
    <>
      <div className="site-card-wrapper">
        <Col>
          <Row gutter={18}>
            <Card
              hoverable={true}
              title={"Live Camera " + resData.label}
              bordered={true}
              style={{
                margin: 10,
                width: "60%",
                border: "1px solid #C0C0C0",
              }}
            >
              <center>
                <VideoRender src={resData.cam_url} isControl={false} />
              </center>
            </Card>
            <Card
              hoverable={true}
              title={"Action"}
              bordered={true}
              style={{
                margin: 10,
                width: "30%",
                border: "1px solid #C0C0C0",
              }}
            >
              {editroom ? (
                <>
                  <Col>
                    <Space wrap>
                      <Space direction="vertical">
                        <Button
                          type="primary"
                          icon={<CameraOutlined />}
                          style={{ marginRight: 10 }}
                          loading={!loading}
                          onClick={() => enterCapture()}
                        >
                          Capture
                        </Button>
                      </Space>
                    </Space>
                  </Col>

                  <Col>
                    <Space wrap>
                      <Space direction="vertical">
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          style={{ marginTop: 10 }}
                          loading={!loading}
                          onClick={() => Editroom(false)}
                        >
                          Edit Room
                        </Button>
                      </Space>
                    </Space>
                  </Col>
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
                    onClick={() => Editroom(true)}
                  >
                    Cancel
                  </Button>
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onEdit}
                    onFinishFailed={onEditFailed}
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
                </>
              )}
            </Card>
          </Row>

          <Row gutter={18}>
            <Card
              hoverable={true}
              title="AI Detection"
              bordered={true}
              style={{
                border: "1px solid #C0C0C0",
                margin: 10,
                width: "92%",
              }}
            >
              <img
                src={`${imgdetect}`}
                width="100%"
                alt={`image ${resData.label} not detection`}
              />
            </Card>
          </Row>
        </Col>
      </div>
    </>
  );
}
