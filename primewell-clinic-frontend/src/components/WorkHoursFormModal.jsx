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
import OneWeekCalendar from "./OneWeekCalendar";

const PatientSignUpModal = (props) => {
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (props.open) {
      form.resetFields();
      message.destroy();
    }
  }, [props.open]);

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
              {/* <div>
                <table style={{ border: "1px solid black" }}>
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
              </div> */}
              <div>
                {/* <button
                  onClick={() =>
                    setCurrentDate(
                      new Date(currentDate.setDate(currentDate.getDate() - 7))
                    )
                  }
                >
                  Previous Week
                </button>
                <button
                  onClick={() =>
                    setCurrentDate(
                      new Date(currentDate.setDate(currentDate.getDate() + 7))
                    )
                  }
                >
                  Next Week
                </button> */}
                <OneWeekCalendar date={currentDate} />
              </div>
            </Form.Item>
            <Form.Item
              name="firstShift"
              label="First Shift"
              rules={[
                {
                  required: true,
                  message: "Please input your Work Hours for your First Shift!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make hours regex
                  message: "Please input your Work Hours for your First Shift!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your work hours for your first shift"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="secondShift"
              label="Second Shift"
              rules={[
                {
                  required: true,
                  message:
                    "Please input your Work Hours for your Second Shift!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make hours regex
                  message:
                    "Please input your Work Hours for your Second Shift!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your work hours for your second shift"
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
