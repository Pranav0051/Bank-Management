import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import fetchUsers from "./fetchrecord"; // Assuming this is the correct path to your fetch function

const BASE_URL = import.meta.env.VITE_BASEURL;
const handelDeleteUser = async (User) => {
  console.log("Deleting User:", User);
  try {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      await axios.delete(`${BASE_URL}/User/Delete/${User}`);
      Swal.fire("Deleted!", "The User has been deleted.", "success");

      if (typeof refreshList === "function") {
        refreshList();
      }
    }
  } catch (error) {
    Swal.fire("Error!", "There was an error deleting the User.", "error");
  }
};
export default handelDeleteUser;
