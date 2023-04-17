import dayjs from "dayjs";

export const env = import.meta.env;

export function pad(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function dateTimeFormat(format: any) {
  let res = "";

  switch (format) {
    case "date-thai":
      res = dayjs().locale("th").add(543, "year").format("DD MMMM YYYY");
      break;

    case "hour":
      res = pad(dayjs().hour(), 2);
      break;

    case "minute":
      res = pad(dayjs().minute(), 2);
      break;

    case "timenow":
      res = pad(dayjs().hour(), 2) + ":" + pad(dayjs().minute(), 2);
      break;

    default:
      res = "Not Found";
      break;
  }
  return res;
}

export function dataURLtoFile(dataurl: any, filename: any) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function previewImage() {
  const canvas: any = document.getElementById("canvas");
  let canvasURL = canvas.toDataURL();

  return canvasURL;
}
