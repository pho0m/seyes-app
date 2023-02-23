// @ts-ignore

import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Space,
  Switch,
  Table,
  Upload,
  UploadProps,
  TimePicker,
  Checkbox,
} from "antd";
import {
  FireOutlined,
  CameraOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import { useState, useEffect } from "react";
import MagicDropzone from "react-magic-dropzone";
import Swal from "sweetalert2";
import { load } from "yolov5js"; //YOLO_V5_N_COCO_MODEL_CONFIG
import { dateTimeFormat, pad } from "../../components/helper";
import {
  dataURLtoFile,
  drawImageOnCanvas,
  getBase64Dimensions,
  getOriginalImageRect,
  getScaledImageRect,
  loadImage,
} from "../../components/model";
import VideoRender from "../../components/video";
import { camTable, ReportsTable } from "../../components/interface";
import "video.js/dist/video-js.css";
import * as htmlToImage from "html-to-image";

const env = import.meta.env;
const MY_MODEL: any = "../../src/static/assets/web_model/model.json";
const weight = ["com_on", "person"];

const config = {
  source: MY_MODEL,
  classNames: weight,
};

const WAITING_FOR_IMAGE = 0;
const IMAGE_LOADED = 1;
const INFERENCE_COMPLETED = 2;

const BOX_COLORS = [
  "#FF3838",
  "#8438FF",
  "#FF701F",
  "#FFB21D",
  "#CFD231",
  "#48F90A",
  "#92CC17",
  "#3DDB86",
  "#1A9334",
  "#00D4BB",
  "#2C99A8",
  "#00C2FF",
  "#344593",
  "#6473FF",
  "#0018EC",
  "#FF9D97",
  "#520085",
  "#CB38FF",
  "#FF95C8",
  "" + "#FF37C7",
];

const BOX_LINE_WIDTH = 2;
const FONT_COLOR = "#FFFFFF";
const FONT_SIZE = 12;
const FONT = FONT_SIZE + "px sans-serif";

export default function SigleCameraPage() {
  const [model, setModel] = useState<any>(null);
  const [status, setStatus] = useState(WAITING_FOR_IMAGE);
  let [person, setPerson] = useState(0);
  let [comOn, setComOn] = useState(0);
  const [uploadAt, setUploadAt] = useState("no data");
  const [timeAt, setTimeAt] = useState("no data");
  const [newImage, setNewImage] = useState<any>();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isControl, setIsControl] = useState(false);

  //FIXME rtsp dynamic cam
  const rtspCam =
    env.VITE_RTSP_URL +
    "/stream/aefc49f7-e29b-4a84-bd42-7ba08e51f16d/channel/0/hls/live/index.m3u8";

  useEffect(() => {
    let timerInterval: any;

    loadingPage &&
      Swal.fire({
        title: "Wait a minute",
        html: `I will close in milliseconds.`,
        timer: loadingPage ? 5000 : 0,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();

          timerInterval = setInterval(() => {
            Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

    load(config)
      .then((model: any) => {
        setModel(model);
        setLoadingPage(false);
        Swal.fire({
          icon: "success",
          title: "Model loaded",
          text: "Ready for rock",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoadingPage(true);
      })
      .catch((error) => {
        setLoadingPage(false);
        Swal.fire({
          icon: "error",
          title: "Error Something went wrong!",
          text: error,
        });
      });
  }, []);

  const onSubmitToNotify = async (index: number) => {
    const canvas: any = document.getElementById("canvas");
    let canvasURL = canvas.toDataURL();
    let file = dataURLtoFile(canvasURL, "photo");
    setNewImage(file);

    // const [onmonday, setOnMonday] = useState(false);
    // const onChangeMonday = (e: CheckboxChangeEvent) => {
    //   console.log(`checked = ${e.target.checked}`);

    //   const check = e.target.checked;
    //   if (check == true) {
    //     setOnMonday(true);
    //   } else setOnMonday(false);
    // };

    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("person", `${person}`);
    formData.append("com_on", `${comOn}`);
    formData.append("upload_at", uploadAt);
    formData.append("time", timeAt);

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
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    const videoElement: any = document.getElementById(
      "videos"
    ) as HTMLImageElement;

    htmlToImage
      .toPng(videoElement)
      .then(async (dataUrl) => {
        var img = new Image();
        img.src = dataUrl;
        // document.body.appendChild(img);

        setStatus(IMAGE_LOADED);
        setPerson(0); //FIXME find new ways to refactor
        setComOn(0);

        let a = await getBase64Dimensions(dataUrl);

        onImageLoad(img);

        setStatus(INFERENCE_COMPLETED);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error Something went wrong!",
          text: error,
        });

        // Swal.fire({
        //   imageUrl: "https://placeholder.pics/svg/300x1500",
        //   imageHeight: 1500,
        //   imageAlt: "A tall image",
        // });
      });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        Swal.fire("Success!", "Capture Success !", "success");

        return newLoadings;
      });
    }, 5000);
  };

  const onDrop = (accepted: any) => {
    setStatus(IMAGE_LOADED);
    setPerson(0); //FIXME find new ways to refactor
    setComOn(0);

    loadImage(accepted[0]).then((image) => {
      onImageLoad(image);
      setStatus(INFERENCE_COMPLETED);
    });

    setUploadAt(dateTimeFormat("date-thai"));
    setTimeAt(dateTimeFormat("timenow"));
  };

  const onImageLoad = (image: any) => {
    const canvas: any = document.getElementById("canvas");

    const ctx = canvas.getContext("2d");
    ctx.font = FONT;
    ctx.textBaseline = "top";

    const originalImageRect = getOriginalImageRect(image);
    const scaledImageRect = getScaledImageRect(image, canvas);

    drawImageOnCanvas(image, ctx, originalImageRect, scaledImageRect);

    // PREDICT <-
    model.detect(image).then((predictions: any) => {
      person = 0;
      comOn = 0;
      predictions.forEach((prediction: any) => {
        var preClass = prediction.class;

        if (preClass == "person") {
          setPerson((person += 1));
        }

        if (preClass == "com_on") {
          setComOn((comOn += 1));
        }

        const x =
          (prediction.x / originalImageRect[2]) * scaledImageRect[2] +
          scaledImageRect[0];
        const y =
          (prediction.y / originalImageRect[3]) * scaledImageRect[3] +
          scaledImageRect[1];
        const width =
          (prediction.width / originalImageRect[2]) * scaledImageRect[2];
        const height =
          (prediction.height / originalImageRect[2]) * scaledImageRect[2];
        const label = prediction.class + ": " + prediction.score.toFixed(2);
        const boxColor = BOX_COLORS[prediction.classId % 20];

        ctx.strokeStyle = boxColor;
        ctx.lineWidth = BOX_LINE_WIDTH;
        ctx.strokeRect(x, y, width, height);
        const labelWidth = ctx.measureText(label).width;
        ctx.fillStyle = boxColor;
        ctx.fillRect(x, y, labelWidth + 4, FONT_SIZE + 4);
        ctx.fillStyle = FONT_COLOR;
        ctx.fillText(label, x, y);
      });
    });
  };

  const data: ReportsTable[] = [];

  {
    [...Array(20)].map((x, i) => {
      i++;
      data.push({
        key: i,
        id: i,
        label: "70" + i,
        status: "detected",
        class: null,
        date_time: "01/01/0001 12 am.",
        subject: null,
        person_count: null,
        comon_count: null,
      });
    });
  }

  return (
    <>
      <div className="site-card-wrapper">
        <Col>
          <Row gutter={18}>
            <Card
              hoverable={true}
              title="Live Camera 703"
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
              title="Details Room 703"
              bordered={true}
              style={{
                margin: 10,
                width: "45%",
                border: "1px solid #C0C0C0",
              }}
            >
              27
            </Card>
          </Row>
          <Row gutter={18}>
            <Card
              hoverable={true}
              title="Action"
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
                      onChange={(v: boolean) => {
                        setIsControl(v);
                      }}
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
                    {status === INFERENCE_COMPLETED ? (
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
                    ) : (
                      <Button disabled type="primary">
                        Send To Line Notify
                      </Button>
                    )}
                  </Space>
                </Space>

                <Col>
                  <h1>Summary</h1>
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
                    {uploadAt}
                  </p>
                  <p>
                    <b>Time: </b>
                    {timeAt}
                  </p>
                </Col>
              </Col>
            </Card>

            <Card
              hoverable={true}
              title="Log Reports"
              bordered={true}
              style={{
                margin: 10,
                width: "45%",
                border: "1px solid #C0C0C0",
              }}
            >
              <Col>
                <Table
                  columns={camTable}
                  dataSource={data}
                  pagination={{ pageSize: 3 }}
                  scroll={{}}
                />
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
              <div className="Dropzone-page">
                <MagicDropzone
                  className="Dropzone"
                  accept="image/jpeg, image/png, .jpg, .jpeg, .png"
                  multiple={false}
                  onDrop={onDrop}
                >
                  {status === WAITING_FOR_IMAGE && "Choose or drop a file."}
                  {status === IMAGE_LOADED && "Detection in progress."}
                  {status === INFERENCE_COMPLETED && "Success detection....  "}
                  <br />
                  {status === INFERENCE_COMPLETED &&
                    "If you want to change image."}
                  <br />
                  {status === INFERENCE_COMPLETED && "Choose or drop a file."}
                </MagicDropzone>
              </div>
              <canvas
                id="canvas"
                style={{ width: "100%", height: "100%" }}
                width="1920"
                height="1080"
              />
            </Card>
          </Row>
          <Card
            hoverable={true}
            title="Setting Time off AI Detection"
            bordered={true}
            style={{
              minHeight: "20vh",
              minWidth: "50vh",
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            {/* <Checkbox onChange={onChangeMonday}>
              Monday
              {onmonday ? (
                <>
                  <Card
                    title="Monday set trun off AI"
                    hoverable={true}
                    bordered={false}
                    style={{
                      height: 150,
                      width: 300,
                      margin: 10,
                      border: "1px solid #C0C0C0",
                    }}
                  >
                    <TimePicker.RangePicker
                      onChange={(v) => {
                        console.log("onchange value:", v);
                      }}
                    />
                  </Card>
                </>
              ) : (
                " Set Time off"
              )}
            </Checkbox> */}
          </Card>
        </Col>
      </div>
    </>
  );
}
