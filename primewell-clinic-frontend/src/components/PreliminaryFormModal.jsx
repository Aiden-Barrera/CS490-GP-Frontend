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

  // logic can be implemented here to construct what problem was checked in the form then used however
  // like sending it to the database to store it and then use it to display it somewhere if needed
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Modal
      open={props.open}
      footer={null}
      onCancel={handleClose}
      centered
      className="style-modal"
      width={650} // Width of the Modal
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
        <h1 style={{ fontSize: "64px", color: "#333333" }}>Preliminary Form</h1>
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
            <Form.Item>
              <div>
                <table style={{ textAlign: "left", width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "0px 11px" }}>MUSCLE/JOINT/BONE</th>
                      <th style={{ padding: "0px 11px" }}>
                        EYES/EARS/NOSE/THROAT
                      </th>
                      <th style={{ padding: "0px 11px" }}>NEUROLOGIC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "0px 11px" }}>
                        <Checkbox onChange={onChange}>Back Pain</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Leg Pain</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Neck pain</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Arm Pain</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Joint Pain</Checkbox>
                      </td>
                      <td style={{ padding: "0px 11px" }}>
                        <Checkbox onChange={onChange}>Blurred Vision</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Loss of Hearing</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Nose Bleeds</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Sinus Problems</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Strep Throat</Checkbox>
                      </td>
                      <td style={{ padding: "0px 11px" }}>
                        <Checkbox onChange={onChange}>Fainting</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Dizziness</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Headache</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Memory Loss</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Depression</Checkbox>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ padding: "0px 11px" }}>SKIN</th>
                      <th style={{ padding: "0px 11px" }}>LUNGS</th>
                      <th style={{ padding: "0px 11px" }}>CARDIOVASCULAR</th>
                    </tr>
                    <tr>
                      <td style={{ padding: "0px 11px" }}>
                        <Checkbox onChange={onChange}>Itching</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Rash</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Callus</Checkbox>
                      </td>
                      <td style={{ padding: "0px 11px" }}>
                        <Checkbox onChange={onChange}>
                          Shortness of Breath
                        </Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>
                          Persistent Cough
                        </Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Asthma</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Sleep Apnea</Checkbox>
                      </td>
                      <td style={{ padding: "0px 11px" }}>
                        <Checkbox onChange={onChange}>Chest Pain</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>
                          Irregular Heart Beat
                        </Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Heart Attack</Checkbox>
                        <br />
                        <Checkbox onChange={onChange}>Heart Disease</Checkbox>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                Submit Preliminary Form
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default PatientSignUpModal;
