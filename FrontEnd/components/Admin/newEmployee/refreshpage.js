import axios from "axios";
import swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASEURL; // Adjust the path as necessary

const refreshList = () => {
  axios
    .get(`${BASE_URL}/Employee/GetAll`)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching employee data:", error);
      swal.fire("Error", "Failed to fetch employee data", "error");
    });
};
export default refreshList;