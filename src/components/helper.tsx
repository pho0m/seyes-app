import dayjs from "dayjs";

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
