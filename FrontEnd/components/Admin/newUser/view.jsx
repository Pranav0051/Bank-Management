import Swal from "sweetalert2";

const handelviewUser = (User) => {
  const photoBase64 = User.photoBase64 || "";
  Swal.fire({
    title: "Edit User",
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
    
        <form id="editUserForm">
          <input type="hidden" name="id" value="${User.id}" />
    
          <table>
            <tr>
              <td colspan="2">
                <div style="display: flex; justify-content: center;">
                <div style="text-align: center;">
                  <label class="form-label">Profile Photo</label><br/>
                  <img src="data:image/jpeg;base64,${photoBase64}" alt="User photo"
                    style="width: 100px; height: 100px; margin-top: 10px; border-radius: 8px;" />
                </div>
              </div>
              </td>
            </tr>
          
            <tr>
              <td class="form-label">First Name:</td>
              <td>${User.firstname}</td>
            </tr>
            <tr>
              <td class="form-label">Last Name:</td>
              <td>${User.lastname}</td>
            </tr>
            <tr>
              <td class="form-label">Phone:</td>
              <td>${User.phone}</td>
            </tr>
            <tr>
              <td class="form-label">Email:</td>
              <td>${User.email}</td>
            </tr>
            <tr>
              <td class="form-label">User ID:</td>
              <td>${User.loginId}</td>
            </tr>
            <tr>
              <td class="form-label">Password:</td>
              <td>${User.password}</td>
            </tr>
            <tr>
              <td class="form-label">Address:</td>
              <td>${User.address}</td>
            </tr>
          </table>
        </form>
      `,
    confirmButtonText: "Close",
  });
};
export default handelviewUser;
