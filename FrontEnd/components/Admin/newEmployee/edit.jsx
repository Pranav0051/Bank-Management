import Swal from "sweetalert2";
import axios from "axios";
import fetchEmployees from "./fetchrecord"; // Assuming this is the correct path to your fetch function

const BASE_URL = import.meta.env.VITE_BASEURL; // Adjust the path as necessary

const handelEditEmployee = (employee, form, refreshList) => {
  const photoBase64 = employee.photoBase64 || "";
  Swal.fire({
    title: "Edit Employee",
    width: "60%", // optional: increase width for table
    html: `
      <style>
        #photo::file-selector-button {
          background-color: #0d6efd;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
  
        #photo::file-selector-button:hover {
          background-color: #0b5ed7;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
        }
  
        td {
          padding: 10px;
          vertical-align: top;
        }
  
        .form-label {
          font-weight: bold;
        }
  
        .swal2-html-container {
          text-align: left;
          width: 100%;
        }

        .scroll-wrapper {
        overflow-x: auto;
        width: 100%;
        }

        .employee-table {
        width: 100%;
        min-width: 1000px; /* makes it scroll horizontally on smaller screens */
        border-collapse: collapse;
        }

        .employee-table td {
        padding: 10px;
        vertical-align: top;
        }

      </style>
  
      <form id="editEmployeeForm">
        <input type="hidden" name="id" value="${employee.id}" />

        <div class="scroll-wrapper">
        <table class="employee-table">
          <tr>
            <td colspan="2">
              <div style="display: flex; justify-content: center;">
              <div style="text-align: center;">
                <label class="form-label">Profile Photo</label><br/>
                <img src="data:image/jpeg;base64,${photoBase64}" alt="Employee photo"
                  style="width: 100px; height: 100px; margin-top: 10px; border-radius: 8px;" />
              </div>
            </div>
            </td>
          </tr>

          <tr>
            <td class="form-label">Upload New Photo:</td>
            <td>
              <input type="file" class="form-control" id="photo" name="photo" accept="image/jpeg" />
            </td>
          </tr>

          <tr>
            <td class="form-label">First Name:</td>
            <td><input type="text" class="form-control" id="firstname" name="firstname" value="${employee.firstname}" required /></td>
          </tr>

          <tr>
            <td class="form-label">Last Name:</td>
            <td><input type="text" class="form-control" id="lastname" name="lastname" value="${employee.lastname}" required /></td>
          </tr>

          <tr>
            <td class="form-label">Phone:</td>
            <td><input type="text" class="form-control" id="phone" name="phone" value="${employee.phone}" required /></td>
          </tr>

          <tr>
            <td class="form-label">Email:</td>
            <td><input type="email" class="form-control" id="email" name="email" value="${employee.email}" required /></td>
          </tr>

          <tr>
            <td class="form-label">Employee ID:</td>
            <td><input type="text" class="form-control" id="loginId" name="loginId" value="${employee.loginId}" required /></td>
          </tr>

          <tr>
            <td class="form-label">Password:</td>
            <td><input type="password" class="form-control" id="password" name="password" value="${employee.password}" required /></td>
          </tr>

          <tr>
            <td class="form-label">Address:</td>
            <td><input type="text" class="form-control" id="address" name="address" value="${employee.address}" required /></td>
          </tr>

          </table>
        </div>
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: "Update",
    preConfirm: async () => {
      const form = document.getElementById("editEmployeeForm");
      const formData = new FormData(form);
      try {
        await axios.put(`${BASE_URL}/Employee/Update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Updated!", "The employee has been updated.", "success");
        // Refresh the employee list

        if (typeof refreshList === "function") {
          refreshList();
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error updating the employee.",
          "error"
        );
      }
    },
  });
};
export default handelEditEmployee;
