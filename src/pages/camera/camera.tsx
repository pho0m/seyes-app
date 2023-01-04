// import React from "react";
// import ReactDOM from "react-dom";
// import Dropzone from "react-dropzone";

// import tf from "@tensorflow/tfjs";

// const weights = "/web_model/model.json";

// const names = ["com_off", "com_on", "person"];

// export default function CameraPage() {
//   return (
//     <>
//       <div className="Dropzone-page">
//         <div className="Dropzone-input-wrapper">
//           <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
//             {({ getRootProps, getInputProps }) => (
//               <section>
//                 <div {...getRootProps()}>
//                   <input {...getInputProps()} />
//                   <p>Drag 'n' drop some files here, or click to select files</p>
//                 </div>
//               </section>
//             )}
//           </Dropzone>
//         </div>
//       </div>
//     </>
//   );
// }

// import React from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd";
// import { message, Upload } from "antd";

// const { Dragger } = Upload;

// const props: UploadProps = {
//   name: "file",
//   multiple: true,
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   onChange(info) {
//     const { status } = info.file;
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
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };

// export default function CameraPage() {
// return (
//   <Dragger {...props}>
//     <p className="ant-upload-drag-icon">
//       <InboxOutlined />
//     </p>
//     <p className="ant-upload-text">
//       Click or drag file to this area to upload
//     </p>
//     <p className="ant-upload-hint">
//       Support for a single or bulk upload. Strictly prohibit from uploading
//       company data or other band files
//     </p>
//   </Dragger>
// );
// }

// import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
// import { InboxOutlined } from "@ant-design/icons";
// import { Col, message, Row, Upload } from "antd";

// import tf from "@tensorflow/tfjs";

// const weights = "public/web_model/model.json";

// console.log(weights);

// const names = ["com_off", "com_on", "person"];

// const { Dragger } = Upload;

// export default function CameraPage() {
//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as RcFile);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   const props: UploadProps = {
//     name: "file",
//     multiple: false,
//     action: "http://localhost:8000/cameras",
//     listType: "picture",
//     accept: ".png,.jpg,.jepg",
//     onChange(info) {
//       const { status } = info.file;
//       console.log(status);
//       console.log("info :", info);

//       if (status !== "uploading") {
//         console.log(info.file, info.fileList);
//       }
//       if (status === "done") {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onPreview() {
//       onPreview;
//     },

//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   return (
//     <>
//       <Row>
//         <Col span={6} pull={18}>
//           sdf
//         </Col>

//         <Col span={18} push={6}>
//           <div>
//             <Dragger {...props}>
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
//           </div>
//         </Col>
//       </Row>
//     </>
//   );
// }
import { useState, useEffect } from "react";
// @ts-ignore
import MagicDropzone from "react-magic-dropzone";
import { load, YOLO_V5_N_COCO_MODEL_CONFIG } from "yolov5js";
const MY_MODEL: any = "./src/static/assets/web_model/model.json";
const names = ["com_off", "com_on", "person"];

const config = {
  source: MY_MODEL,
  classNames: names,
};

const WAITING_FOR_IMAGE = 0;
const IMAGE_LOADED = 1;
const INFERENCE_COMPLETED = 2;

const BOX_COLORS = [
  "#FF3838",
  "#FF9D97",
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
  "#8438FF",
  "#520085",
  "#CB38FF",
  "#FF95C8",
  "" + "#FF37C7",
];
const BOX_LINE_WIDTH = 2;
const FONT_COLOR = "#FFFFFF";
const FONT_SIZE = 12;
const FONT = FONT_SIZE + "px sans-serif";

export default function CameraPage() {
  const [model, setModel] = useState<any>(null);
  const [status, setStatus] = useState(WAITING_FOR_IMAGE);

  useEffect(() => {
    console.log("config :", config);

    console.log("yolo :", YOLO_V5_N_COCO_MODEL_CONFIG);
    // console.log("ModelConfig :", ModelConfig);

    // LOAD MODEL <-

    load(config)
      .then((model: any) => {
        setModel(model);
        console.log("Model loaded :)");
      })
      .catch((error) => {
        console.log("Model failed to loaded :(");
      });
  }, []);

  const loadImage = (fileData: any) => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(fileData);
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
  };

  const onDrop = (accepted: any, rejected: any, links: any) => {
    setStatus(IMAGE_LOADED);
    loadImage(accepted[0]).then((image) => {
      onImageLoad(image);
      setStatus(INFERENCE_COMPLETED);
    });
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
      predictions.forEach((prediction: any) => {
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
      });
    });
  };

  return (
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
          <canvas id="canvas" width="640" height="640" />
        </MagicDropzone>
      ) : (
        <div className="Dropzone">Loading model...</div>
      )}
    </div>
  );
}
