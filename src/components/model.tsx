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
