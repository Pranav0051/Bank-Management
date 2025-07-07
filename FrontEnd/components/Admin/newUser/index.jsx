import { Button, Card, Form, Input, Table } from "antd";
import { message } from "antd";
import swalert from "sweetalert";
import { use, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
import handelDeleteUser from "./delete";
import handelEditUser from "./edit";
import handelviewUser from "./view";


import { DeleteOutlined, EditOutlined, EyeFilled } from "@ant-design/icons";

import { trimData, http } from "../../../modules/modules";

const BASE_URL = import.meta.env.VITE_BASEURL;
const { Item } = Form;

const NewUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const finalValues = trimData(values);
      const httpRequest = http();
      const photoFile = finalValues.photo;

      if (!photoFile) {
        message.error("Please upload a photo");
        return;
      }

      const formData = new FormData();
      formData.append("firstname", finalValues.firstname);
      formData.append("lastname", finalValues.lastname);
      formData.append("phone", finalValues.phone);
      formData.append("email", finalValues.email);
      formData.append("password", finalValues.password);
      formData.append("address", finalValues.address);
      formData.append("loginId", finalValues.loginId);
      formData.append("photo", photoFile);
      //formData.append("photoFile", photoFile); // ✅ updated field name

      await httpRequest.post(`/User/Save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //message.success("User saved successfully");
      swalert("Success", "User saved successfully!", "success");
      form.resetFields(); // Reset the form fields after successful submission
      refreshList(); // Refresh the User list after saving
    } catch (error) {
      console.error("Failed to save User:", error);
      //message.error("Failed to save User");
      swalert("Error", "Failed to save User", "error");
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  // Define the columns for the User table
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "User ID",
      dataIndex: "loginId",
      key: "loginId",
    },
    {
      title: "Photo",
      dataIndex: "photoBase64",
      key: "photo",
      render: (photoBase64) =>
        photoBase64 ? (
          <img
            src={`data:image/jpeg;base64,${photoBase64}`}
            alt="User"
            className="w-12 h-12 rounded-full"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, User) => (
        <div className="flex gap-1">
          <Button
            type="text"
            className="!bg-blue-100 !text-blue-500"
            icon={<EyeFilled />}
            onClick={() => handelviewUser(User)}
          />
          <Button
            type="text"
            className="!bg-green-100 !text-green-500"
            icon={<EditOutlined />}
            onClick={() => handelEditUser(User, form)}
          />
          <Button
            type="text"
            className="!bg-red-100 !text-red-500"
            icon={<DeleteOutlined />}
            onClick={() => handelDeleteUser(User.loginId, refreshList)}
          />
        </div>
      ),
    },
  ];

  const refreshList = () => {
    axios
      .get(`${BASE_URL}/User/GetAll`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching User data:", error);
        swalert("Error", "Failed to fetch User data", "error");
      });
    //fetchUsers();
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <>
      <style>
        {`
          .custom-file-input::file-selector-button {
            background-color: #0d6efd;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
          }

          .custom-file-input::file-selector-button:hover {
            background-color: #0b5ed7;
          }
      `}
      </style>
      <div className="grid md:grid-cols-1 gap-4 p-4 ">
        <Card title="Add New User">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <Item
                name="photo"
                label="Profile Photo"
                valuePropName="file"
                rules={[{ required: true }]}
                getValueFromEvent={(e) => e?.target?.files?.[0]}
              >
                <Input
                  className="custom-file-input"
                  placeholder="Photo"
                  type="file"
                  accept="image/jpeg"
                />
              </Item>
            </div>
            <div className="grid md:grid-cols-2 gap-x-2">
              <Item
                name="firstname"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="First Name" />
              </Item>

              <Item
                name="lastname"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Last Name" />
              </Item>

              <Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input placeholder="Phone" type="number" />
              </Item>

              <Item
                name="email"
                label="Email"
                rules={[
                  { required: true },
                  {
                    validator: async (_, value) => {
                      if (!value) return Promise.resolve();
                      const res = await axios.get(
                        `${BASE_URL}/User/check-email?email=${value}`
                      );
                      if (!res.data.available) {
                        return Promise.reject("Email already exists");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Item>

              <Item
                name="loginId"
                label="User ID"
                rules={[
                  { required: true },
                  {
                    validator: async (_, value) => {
                      if (!value) return Promise.resolve();
                      const response = await axios.get(
                        `${BASE_URL}/User/check-loginId?loginId=${value}`
                      );
                      if (!response.data.available) {
                        return Promise.reject(
                          new Error("User ID already exists")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="User ID" />
              </Item>

              <Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input placeholder="Password" type="Password" />
              </Item>
            </div>

            <Item name="address" label="Address" rules={[{ required: true }]}>
              <Input.TextArea />
            </Item>

            <Item>
              <Button
                loading={loading}
                type="text"
                htmlType="submit"
                block
                className="!bg-blue-500 !text-white !font-bold "
              >
                Submit
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
      <div className="grid md:grid-cols-1 gap-4 p-4 ">
        <Card
          className="md:col-span-4"
          title="User List"
          style={{ overflowX: "auto" }}
        >
          <div className="overflow-x-auto max-h-[500px]">
            <Table
              className="table-layout: auto"
              columns={columns}
              dataSource={data}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default NewUser;
