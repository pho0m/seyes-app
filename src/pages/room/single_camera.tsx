// @ts-ignore

import { Button, Card, Col, Row, Space, Switch } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import VideoRender from "../../components/video";
import "video.js/dist/video-js.css";
import { useLocation } from "react-router";
import { RoomData } from "./index_camera";
import Title from "antd/es/typography/Title";
import { CheckboxComponent } from "../../components/checkbox";

export default function SigleCameraPage() {
  const location = useLocation();
  const { roomData } = location.state;
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isControl, setIsControl] = useState(false);
  const [resdatect, setResdatect] = useState() as any;

  /////////////detect defualt //////////////////

  const [person, setPerson] = useState(0);
  const [comOn, setComOn] = useState(0);
  const [accurency, setAccurency] = useState(0.0);
  const [repordate, setReportData] = useState("");
  const [reportime, setReportTime] = useState("");
  const [imgdectect, setImgDetect] = useState("");

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

  const enterCapture = () => {
    setLoadingPage(true);
    (async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://202.44.35.76:9091/api/detect/${rd.id}`,
        });
        setLoadingPage(false);
        if (response.status === 200) {
          setResdatect(response.data);
          setPerson(resdatect.person_count);
          setComOn(resdatect.com_on_count);
          setReportData(resdatect.report_date);
          setReportTime(resdatect.report_time);
          setAccurency(resdatect.accurency);
          setImgDetect(resdatect.iamge);
        }
      } catch (err) {
        // Swal.fire({
        //   icon: "error",
        //   title: "Error Something went wrong!",
        //   text: `${err}`,
        // });
        return;
      }
    })();
    [];
  };

  if (loadingPage) {
    return <>Loading</>;
  }

  console.log("rdddcccc", resdatect);

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
                    <Button
                      type="primary"
                      icon={<CameraOutlined />}
                      style={{ marginRight: 10 }}
                      loading={loadings[0]}
                      onClick={() => enterCapture()}
                    >
                      Capture
                    </Button>
                  </Space>
                </Space>
                <Col>
                  <Title level={4}>Summary</Title>
                  <p>
                    <b>Person: </b>
                    {person}
                  </p>
                  <p>
                    <b>Com On: </b>
                    {comOn}
                  </p>
                  <p>
                    <b>Upload At: </b>
                    {repordate}
                  </p>
                  <p>
                    <b>Time: </b>
                    {reportime}
                  </p>
                  <p>
                    <b>Accurency: </b>
                    {accurency}
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
              <img
                src={imgdectect}
                width="100%"
                alt="image 702 not detection"
              />
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
