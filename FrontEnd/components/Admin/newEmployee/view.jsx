import Swal from "sweetalert2";

const handelviewEmployee = (employee) => {
  const photoBase64 = employee.photoBase64 || "";
  Swal.fire({
    title: "Edit Employee",
    width: "60%", // optional: increase width for table
    html: `
        <style>
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
          }
        </style>
    
        <form id="editEmployeeForm">
          <input type="hidden" name="id" value="${employee.id}" />
    
          <table>
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
              <td class="form-label">First Name:</td>
              <td>${employee.firstname}</td>
            </tr>
            <tr>
              <td class="form-label">Last Name:</td>
              <td>${employee.lastname}</td>
            </tr>
            <tr>
              <td class="form-label">Phone:</td>
              <td>${employee.phone}</td>
            </tr>
            <tr>
              <td class="form-label">Email:</td>
              <td>${employee.email}</td>
            </tr>
            <tr>
              <td class="form-label">Employee ID:</td>
              <td>${employee.loginId}</td>
            </tr>
            <tr>
              <td class="form-label">Password:</td>
              <td>${employee.password}</td>
            </tr>
            <tr>
              <td class="form-label">Address:</td>
              <td>${employee.address}</td>
            </tr>
          </table>
        </form>
      `,
    confirmButtonText: "Close",
  });
};
export default handelviewEmployee;
