import axios from "axios";
import Swal from "sweetalert2";

export async function GetRoom() {
  try {
    const response = await axios({
      method: "GET",
      headers: { "Content-Type": "multipart/form-data" },
      url: "http://202.44.35.76:9091/api/rooms?page=1",
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
