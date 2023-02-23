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
  return [0, 0, image.naturalWidth, image.naturalHeight];
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

export const dataURLtoFile = (dataurl: any, filename: any) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export async function getBase64Dimensions(src: string) {
  return new Promise<[number, number]>((resolve, reject) => {
    const image = new Image();

    image.src = src;

    image.onload = () => resolve([image.width, image.height]);
    image.onerror = () => reject();
  });
}
