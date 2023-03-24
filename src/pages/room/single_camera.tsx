// @ts-ignore

import { Button, Card, Col, Row, Space, Switch } from "antd";
import { FireOutlined, CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { dataURLtoFile, env } from "../../components/helper";
import VideoRender from "../../components/video";
import "video.js/dist/video-js.css";
import { useLocation } from "react-router";
import { RoomData } from "./index_camera";
import Title from "antd/es/typography/Title";
import { useAsync } from "react-use";
import { GetAllReport } from "../../api/report";
import { CheckboxComponent } from "../../components/checkbox";

export default function SigleCameraPage() {
  const location = useLocation();
  const { roomData } = location.state;
  let [person, setPerson] = useState(0);
  let [comOn, setComOn] = useState(0);
  const [uploadAt, setUploadAt] = useState("no data");
  const [timeAt, setTimeAt] = useState("no data");
  const [newImage, setNewImage] = useState<any>();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isControl, setIsControl] = useState(false);
  const [accurency, setAccurency] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resdata, setResdata] = useState() as any;
  const [resdatac, setResdatac] = useState() as any;
  const [resImage, setImage] = useState() as any;

  const rd: RoomData = roomData;
  const rtspCam = rd.cam_url;
  const label = rd.label;

  const [focusArea, setFocusArea] = useState([
    { focus: "Monday", isAdded: false },
    { focus: "Tursday", isAdded: false },
    { focus: "Wednesday", isAdded: false },
    { focus: "Thursday", isAdded: false },
    { focus: "Friday", isAdded: false },
    { focus: "Saturday", isAdded: false },
    { focus: "Sunday", isAdded: false },
  ]);

  const handleOnChange = (event, option, index) => {
    const values = [...focusArea];
    values[index].isAdded = event.target.checked;
    setFocusArea(values);
  };

  const onSubmitToNotify = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      Swal.fire({
        title: "Wait a minute",
        html: `preparing to notify`,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      return newLoadings;
    });

    const canvas: any = document.getElementById("canvas");
    let canvasURL = canvas.toDataURL();
    let file = dataURLtoFile(canvasURL, "photo");
    setNewImage(file);

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("person", `${person}`);
    formData.append("com_on", `${comOn}`);
    formData.append("upload_at", uploadAt);
    formData.append("time", timeAt);
    formData.append("accurency", accurency.toFixed(2));

    try {
      const response = await axios({
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        url: env.VITE_BASE_URL + "/notify",
      });

      if (response.status === 200) {
        setTimeout(() => {
          setLoadings((prevLoadings_1) => {
            const newLoadings_1 = [...prevLoadings_1];
            newLoadings_1[index] = false;
            return newLoadings_1;
          });
          Swal.fire("Success!", "data have been send!", "success");
        }, 2000);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Something went wrong!",
        text: "can't send data",
      });
    }
  };

  const enterCapture = async (index: number) => {
    setLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: "http://202.44.35.76:9091/api/detect/c319f57f-6db1-4ada-9ca4-f0fdb38c13f2/channel/0",
      });

      if (response.status === 200) {
        setResdatac(response.data);
        setImage(resdatac.image);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Something went wrong!",
        text: "can't send data",
      });
    }
  };

  console.log("rdddcccc", resdatac);

  return (
    <>
      <div className="site-card-wrapper">
        <Col>
          <Row gutter={18}>
            <Card
              hoverable={true}
              title={"Live Camera " + label}
              bordered={true}
              style={{
                margin: 10,
                width: "45%",
                border: "1px solid #C0C0C0",
              }}
            >
              <center>
                <VideoRender src={rtspCam} isControl={isControl} />
              </center>
            </Card>
            <Card
              hoverable={true}
              title={"Action"}
              bordered={true}
              style={{
                margin: 10,
                width: "45%",
                border: "1px solid #C0C0C0",
              }}
            >
              <Col>
                <Space wrap>
                  <Space direction="vertical">
                    <Switch
                      checkedChildren="Active Control Video"
                      unCheckedChildren="Inactive Control Video"
                    />
                    <Button
                      type="primary"
                      icon={<CameraOutlined />}
                      style={{ marginRight: 10 }}
                      loading={loadings[0]}
                      onClick={() => enterCapture(0)}
                    >
                      Capture
                    </Button>

                    <Button
                      type="primary"
                      icon={<FireOutlined />}
                      loading={loadings[1]}
                      onClick={() => {
                        onSubmitToNotify(1);
                      }}
                    >
                      Send To Line Notify
                    </Button>
                  </Space>
                </Space>
                <Col>
                  <Title level={4}>Summary</Title>
                  <p>
                    <b>Person: </b>
                  </p>
                  <p>
                    <b>Com On: </b>
                  </p>
                  <p>
                    <b>Upload At: </b>
                  </p>
                  <p>
                    <b>Time: </b>
                  </p>
                  <p>
                    <b>Accurency: </b>
                  </p>
                </Col>
              </Col>
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
              <img src={resImage} width="100%" alt="image 702" />
            </Card>
          </Row>

          <Row gutter={18}>
            <Card
              hoverable={true}
              title="Setting Time off AI Detection"
              bordered={true}
              style={{
                border: "1px solid #C0C0C0",
                margin: 10,
                width: "92%",
              }}
            >
              <Col span={2}>
                <CheckboxComponent
                  list={focusArea}
                  handleOnChange={handleOnChange}
                />
              </Col>
            </Card>
          </Row>
        </Col>
      </div>
    </>
  );
}
