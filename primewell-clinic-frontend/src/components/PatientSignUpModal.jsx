import {
  Flex,
  Modal,
  Form,
  message,
  Button,
  Input,
  Divider,
  Dropdown,
  Space,
  Tooltip,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { DownOutlined, MedicineBoxTwoTone } from "@ant-design/icons";

const PatientSignUpModal = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.open) {
      form.resetFields();
      message.destroy();
    }
  }, [props.open]);

  const filterPW = (pw) => {
    return pw.replace(/"/g, '\\"');
  };

  const onFinish = async (value) => {
    if (props.userType === "Patient") {
      // If they clicked Patient button, this will run for login
      const res = await axios.post(
        "http://localhost:3000/passAuthPatient",
        value
      );
      if (res.data.length === 0) {
        console.log("Couldn't log in");
      } else {
        console.log("Logged In");
      }
      console.log(res.data);
    } else if (props.userType === "Doctor") {
      const res = await axios.post(
        "http://localhost:3000/passAuthDoctor",
        value
      );
      if (res.data.length === 0) {
        console.log("Couldn't log in");
      } else {
        console.log("Logged In");
      }
      console.log(res.data);
    } else {
      const res = await axios.post(
        "http://localhost:3000/passAuthPharm",
        value
      );
      if (res.data.length === 0) {
        console.log("Couldn't log in");
      } else {
        console.log("Logged In");
      }
      console.log(res.data);
    }
  };

  const onFail = () => {
    message.error("Submit Failed!");
  };

  const handleClose = () => {
    message.destroy();
    props.handleClose();
  };

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <MedicineBoxTwoTone twoToneColor="#f09c96" />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <MedicineBoxTwoTone twoToneColor="#f09c96" />,
    },
    {
      label: "3rd menu item",
      key: "3",
      icon: <MedicineBoxTwoTone twoToneColor="#f09c96" />,
    },
  ];
  const menuProps = {
    items,
    selectable: true,
    defaultSelectedKeys: ["2"],
    onClick: handleMenuClick,
  };

  return (
    <Modal
      open={props.open}
      footer={null}
      onCancel={handleClose}
      centered
      className="style-modal"
      width={567} // Width of the Modal
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          border: "1px solid #999999",
          borderRadius: "16px",
          padding: "25px",
        }}
      >
        <h1 style={{ fontSize: "64px", color: "#333333" }}>Patient Sign Up</h1>
        <Flex vertical style={{ width: "100%" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFail}
            autoComplete="off"
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make first name regex
                  message: "Please input a valid First Name!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your first name"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make last name regex (probably same as first name)
                  message: "Please input a valid Last Name!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your last name"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please input a valid Email!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="example@gmail.com"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make phone number regex
                  message: "Please input a valid Phone Number!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your phone number"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make address regex
                  message: "Please input a valid Address!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your address"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="zipcode"
              label="Zip Code"
              rules={[
                {
                  required: true,
                  message: "Please input your Zip Code!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make zip code regex
                  message: "Please input a valid Zip Code!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your zip code"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="pharmacy"
              label="Nearest Pharmacy (Based on zip code)"
              rules={[
                {
                  required: true,
                  message: "Please choose a  Pharmacy!",
                },
                {
                  // pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make pharmacy regex????
                  message: "Please choose a  Pharmacy!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    Button
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Form.Item>
            <Form.Item
              name="pw"
              label="Create a password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 5,
                  message: "Password must be at least 5 characters",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input.Password
                placeholder="Enter a password"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                border: "1px solid #999999",
                borderRadius: "18px",
                padding: "22px 0px",
                backgroundColor: "#ffe6e2",
                color: "#000000",
                marginBottom: "10px",
              }}
            >
              Preliminary Form
            </Button>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  border: "1px solid #999999",
                  borderRadius: "18px",
                  padding: "22px 0px",
                  backgroundColor: "#f09c96",
                }}
              >
                Create an account
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
      {/* <Divider>
        <span style={{ color: "#666666" }}>New to our Clinic</span>
      </Divider> */}
      {/* <Button
        type="primary"
        htmlType="submit"
        style={{
          width: "100%",
          border: "1px solid #999999",
          borderRadius: "18px",
          padding: "22px 0px",
          backgroundColor: "#ffe6e2",
          color: "#000000",
          marginBottom: "10px",
        }}
      >
        Create an account
      </Button> */}
    </Modal>
  );
};

export default PatientSignUpModal;
