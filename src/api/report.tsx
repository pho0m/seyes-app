import axios, { Axios, AxiosResponse } from "axios";
import Swal from "sweetalert2";
export const env = import.meta.env;

export async function GetAllReport() {
  try {
    const response = await axios({
      method: "GET",
      headers: { "Content-Type": "multipart/form-data" },
      url: env.VITE_BASE_URL + "/reports?page=1",
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error Something went wrong!",
      text: "can't send data",
    });
  }
}
