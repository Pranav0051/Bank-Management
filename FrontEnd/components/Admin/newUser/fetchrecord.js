import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASEURL; // Adjust the path as necessary
const fetchUsers = async (setData) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/User/GetAll`);
    setData(Array.isArray(data) ? data : []);   // if [], table stays empty
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Could not reach the User service", "error");
    setData([]);                                // safe‑fallback
  }
};
export default fetchUsers;

