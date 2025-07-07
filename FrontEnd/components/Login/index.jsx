import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button } from "antd";
const { Item } = Form;

const Login = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Here you can handle the form submission, e.g., send the data to your backend API
  };
  return (
    <div className="flex">
      <div className="w-full hidden md:flex items-center justify-center">
        <img
          src="/img/bank-img.jpg"
          alt="img"
          className="w-4/5 object-contain"
        />
      </div>

      <div className="w-full md:w=1/2 flex items-center justify-center m-auto">
        <Card className="w-sm shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Bank Login
          </h2>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Item
              name={"LoginAs"}
              label="Login As"
              rules={[{ required: true }]}
            >
              <select className="w-full">
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Customer">Customer</option>
              </select>
            </Item>
            <Item
              name={"username"}
              label="Username"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter Username"
              ></Input>
            </Item>

            <Item
              name={"Password"}
              label="Password"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="Enter Password"
              ></Input>
            </Item>
            <Item>
              <Button
                type="text"
                htmlType="submit"
                block
                className="!bg-blue-500 !text-white !font-bold "
              >
                Login
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    </div>
    
  );
};
export default Login;
