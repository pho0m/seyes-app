import {
  FireOutlined,
  CameraOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Button, Col, message, Row, Upload, Card } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
// @ts-ignore
import MagicDropzone from "react-magic-dropzone";
import Swal from "sweetalert2";
import { load } from "yolov5js"; //YOLO_V5_N_COCO_MODEL_CONFIG
import { pad } from "../../components/helper";
import VideoRender from "../../components/video";

const MY_MODEL: any = "./src/static/assets/web_model/model.json";
const weight = ["com_off", "com_on", "person"];

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
  const [uploadAt, setUploadAt] = useState("");
  const [timeAt, setTimeAt] = useState("");
  const [newImage, setNewImage] = useState<any>();

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    const formData = new FormData();
    formData.append("photo", newImage);
    formData.append("person", `${person}`);
    formData.append("com_on", `${comOn}`);
    formData.append("upload_at", uploadAt);
    formData.append("time", timeAt);

    try {
      const response = await axios({
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        url: "http://localhost:3000/api/notify",
      });

      // console.log(response);

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

  useEffect(() => {
    load(config)
      .then((model: any) => {
        setModel(model);
        Swal.fire({
          icon: "success",
          title: "Model Loaded :)",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error Something went wrong!",
          text: error,
        });
      });
  }, []);

  const loadImage = (fileData: any) => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(fileData);
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.crossOrigin = "anonymous";
    });
  };

  const onDrop = (accepted: any, rejected: any, links: any) => {
    setStatus(IMAGE_LOADED);
    setPerson(0); //FIXME find new ways to refactor
    setComOn(0);

    var file = new File([accepted[0]], "photo");
    setNewImage(file);

    loadImage(accepted[0]).then((image) => {
      onImageLoad(image);
      setStatus(INFERENCE_COMPLETED);
    });

    setUploadAt(dayjs().locale("th").add(543, "year").format("DD MMMM YYYY"));
    var hour = pad(dayjs().hour(), 2);
    var minute = pad(dayjs().minute(), 2);
    var timeNow = hour + ":" + minute;
    setTimeAt(timeNow);
  };

  const getOriginalImageRect = (image: any) => {
    return [0, 0, image.naturalWidth, image.naturalHeight];
  };

  const getScaledImageRect = (image: any, canvas: any) => {
    const ratio = Math.min(
      canvas.width / image.naturalWidth,
      canvas.height / image.naturalHeight
    );
    const scaledWidth = Math.round(image.naturalWidth * ratio);
    const scaledHeight = Math.round(image.naturalHeight * ratio);
    return [
      (canvas.width - scaledWidth) / 2,
      (canvas.height - scaledHeight) / 2,
      scaledWidth,
      scaledHeight,
    ];
  };

  const drawImageOnCanvas = (
    image: any,
    ctx: any,
    originalImageRect: any,
    scaledImageRect: any
  ) => {
    const [
      originalImageX,
      originalImageY,
      originalImageWidth,
      originalImageHeight,
    ] = originalImageRect;
    const [scaledImageX, scaledImageY, scaledImageWidth, scaledImageHeight] =
      scaledImageRect;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      image,
      originalImageX,
      originalImageY,
      originalImageWidth,
      originalImageHeight,
      scaledImageX,
      scaledImageY,
      scaledImageWidth,
      scaledImageHeight
    );
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

        // FIXME remove this logic when new model trained
        if (preClass != "com_off") {
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
          const label = prediction.class + ": " + prediction.score.toFixed(1);
          const boxColor = BOX_COLORS[prediction.classId % 20];

          ctx.strokeStyle = boxColor;
          ctx.lineWidth = BOX_LINE_WIDTH;
          ctx.strokeRect(x, y, width, height);
          const labelWidth = ctx.measureText(label).width;
          ctx.fillStyle = boxColor;
          ctx.fillRect(x, y, labelWidth + 4, FONT_SIZE + 4);
          ctx.fillStyle = FONT_COLOR;
          ctx.fillText(label, x, y);
        }
      });
    });
  };

  return (
    <>
      <Row gutter={[48, 48]}>
        <Col span={2} />
        <Card
          hoverable={true}
          title="Camera 703"
          bordered={true}
          style={{
            minHeight: "20vh",
            minWidth: "50vh",
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
        >
          <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
        </Card>
        <Card
          hoverable={true}
          title="AI Detection"
          bordered={true}
          style={{
            height: 350,
            width: 600,
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
        >
          <div className="Dropzone-page">
            {model ? (
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
            ) : (
              <div className="Dropzone">Loading model...</div>
            )}
          </div>
          <canvas id="canvas" width="100%" height="100%" />
        </Card>
      </Row>
      <Row gutter={[48, 48]}>
        <Col span={2} />
        <Card
          hoverable={true}
          title="Details Room 703"
          bordered={true}
          style={{
            minHeight: "20vh",
            minWidth: "50vh",
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
        >
          27
        </Card>
        <Card
          hoverable={true}
          title="Details for Notify"
          bordered={true}
          style={{
            height: 350,
            width: 600,
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
        >
          <Button
            type="primary"
            icon={<CameraOutlined />}
            style={{ marginRight: 5 }}
          >
            Capture
          </Button>
          {status === INFERENCE_COMPLETED ? (
            <Button
              type="primary"
              icon={<FireOutlined />}
              loading={loadings[1]}
              onClick={() => {
                enterLoading(1);
              }}
            >
              Send To Line Notify
            </Button>
          ) : (
            <Button disabled type="primary">
              Send To Line Notify
            </Button>
          )}
          <br /> <h1>Summary</h1>
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
        </Card>
      </Row>
    </>
  );
}

// console.log(ctx);
// console.log(image);
// const imageData = ctx.getImageData(10, 20, 80, 230);

// console.log(imageData);

// var a = canvas
//   .toDataURL("image/png")
//   .replace("image/png", "image/octet-stream");

//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     onDrop(e, "", "");
//   },
// };
// <Dragger {...props}>
//               <p className="ant-upload-drag-icon">
//                 <InboxOutlined />
//               </p>
//               <p className="ant-upload-text">
//                 Click or drag file to this area to upload
//               </p>
//               <p className="ant-upload-hint">
//                 Support for a single or bulk upload. Strictly prohibit from
//                 uploading company data or other band files
//               </p>
//             </Dragger>
