// @ts-ignore

import { Button, Card, Col, Row, Space, Switch } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import VideoRender from "../../components/video";
import "video.js/dist/video-js.css";
import { useParams } from "react-router-dom";
export const env = import.meta.env;

export default function SigleCameraPage() {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  // const [isControl, setIsControl] = useState(false);

  const [resData, setResponsedata] = useState() as any;
  const [onedit, setloading] = useState(true);

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

  useEffect(() => {
    (async () => {
      const response = await axios({
        method: "GET",
        url: env.VITE_BASE_URL + `/rooms/${params.id}`,
      });

      if (response.status === 200) {
        return setResponsedata(response.data);
      }
    })();
  }, [onedit]);

  if (!resData) {
    return <>Loading</>; //for loading
  }

  console.log(resData);

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
        // setPerson(resdatect.person_count);
        // setComOn(resdatect.com_on_count);
        // setReportData(resdatect.report_date);
        // setReportTime(resdatect.report_time);
        // setAccurency(resdatect.accurency);
        // setImgDetect(res.data.image);

        // console.log("imgdetect", imgdetect);
        // console.log("response", res.data.image);

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

  if (!resData) {
    return <>Loading</>;
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
                width: "75%",
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
                width: "15%",
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
