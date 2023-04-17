import Swal from "sweetalert2";
import * as htmlToImage from "html-to-image";
import { dateTimeFormat } from "./helper";

export const WAITING_FOR_IMAGE = 0;
export const IMAGE_LOADED = 1;
export const INFERENCE_COMPLETED = 2;

export const drawImageOnCanvas = (
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

export const getScaledImageRect = (image: any, canvas: any) => {
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

export const getOriginalImageRect = (image: any) => {
  let res = [0, 0, image.naturalWidth, image.naturalHeight];
  console.log(res);

  return res;
};

export const loadImage = (fileData: any) => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(fileData);
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.crossOrigin = "anonymous";
  });
};

export async function getBase64Dimensions(src: string) {
  return new Promise<[number, number]>((resolve, reject) => {
    const image = new Image();

    image.src = src;

    image.onload = () => resolve([image.width, image.height]);
    image.onerror = () => reject();
  });
}

export const enterCapture = async ({
  index,
  setLoadings,
  setStatus,
  setPerson,
  setComOn,
  setUploadAt,
  onImageLoad,
  setTimeAt,
}) => {
  setLoadings((prevLoadings) => {
    const newLoadings = [...prevLoadings];
    newLoadings[index] = true;
    Swal.fire({
      title: "Wait a minute",
      html: `wait for capture and drawing container`,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
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

      setStatus(IMAGE_LOADED);
      setPerson(0); //FIXME find new ways to refactor
      setComOn(0);

      let dimentions = await getBase64Dimensions(img.src);

      img.width = dimentions[0]; //width
      img.height = dimentions[1]; //height

      onImageLoad(img);
      setUploadAt(dateTimeFormat("date-thai"));
      setTimeAt(dateTimeFormat("timenow"));
      setStatus(INFERENCE_COMPLETED);
    })
    .catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Error Something went wrong!",
        text: error,
      });
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
