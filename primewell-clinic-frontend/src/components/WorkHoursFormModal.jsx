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
  Checkbox,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./table.css";

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

  return (
    <Modal
      open={props.open}
      footer={null}
      onCancel={handleClose}
      centered
      className="style-modal"
      width={950} // Width of the Modal
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
        <h1 style={{ fontSize: "64px", color: "#333333" }}>Work Hours Form</h1>
        <Flex vertical style={{ width: "100%" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFail}
            autoComplete="off"
          >
            <Form.Item>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Sunday</th>
                      <th>Monday</th>
                      <th>Tuesday</th>
                      <th>Wednesday</th>
                      <th>Thursday</th>
                      <th>Friday</th>
                      <th>Saturday</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Form.Item>
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
                Submit Work Hours Form
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default PatientSignUpModal;
