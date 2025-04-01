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
import PreliminaryFormModal from "./PreliminaryFormModal";

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
        <h1 style={{ fontSize: "64px", color: "#333333" }}>Pharmacy Sign Up</h1>
        <Flex vertical style={{ width: "100%" }}>
          <Form
            form={form}
            name="patientsignupform"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFail}
            autoComplete="off"
          >
            <Form.Item
              name="pharmacyName"
              label="Pharmacy Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Pharmacy Name!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // make first name regex
                  message: "Please input a valid Pharmacy Name!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your Pharmacy's Name"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="pharmacyEmail"
              label="Pharmacy Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Pharmacy Email!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please input a valid Pharmacy Email!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your Pharmacy's Email"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="pharmacyAddress"
              label="Pharmacy Address"
              rules={[
                {
                  required: true,
                  message: "Please input your Pharmacy Address!",
                },
                {
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please input a valid Pharmacy Address!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your Pharmacy's Address"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="pharmacyZipCode"
              label="Pharmacy Zip Code"
              rules={[
                {
                  required: true,
                  message: "Please input your Pharmacy Zip Code!",
                },
                {
                  pattern: /^[0-9]{5}$/,
                  message: "Please input a valid Pharmacy Zip Code!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your Pharmacy's Zip Code"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="pharmacyWorkHours"
              label="Pharmacy Work Hours"
              rules={[
                {
                  required: true,
                  message: "Please input your Pharmacy Work Hours!",
                },
                {
                  pattern: /^[0-9]{5}$/,
                  message: "Please input a valid Pharmacy Work Hours!",
                },
              ]}
              validateTrigger="onSubmit"
            >
              <Input
                placeholder="Enter your Pharmacy's Work Hours"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="Pharmacypw"
              label="Create a Pharmacy password"
              rules={[
                {
                  required: true,
                  message: "Please input your Pharmacy Password!",
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
    </Modal>
  );
};

export default PatientSignUpModal;
