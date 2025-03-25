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
  const [isPreliminaryFormModalOpen, setIsPreliminaryFormModalOpen] =
    useState(false);

  const handlePreliminaryFormClick = () => {
    // handleClose();
    setIsPreliminaryFormModalOpen(true);
  };

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

  const [selectedLabel, setSelectedLabel] = useState("Choose a Pharmacy");

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    // console.log("click", e);
    const selectedPharmacy = items.find((item) => item.key === e.key);
    setSelectedLabel(selectedPharmacy.label);
    // console.log(selectedPharmacy.label);
  };

  const items = [
    {
      label: "Pharmacy 1",
      key: "1",
      icon: <MedicineBoxTwoTone twoToneColor="#f09c96" />,
    },
    {
      label: "Pharmacy 2",
      key: "2",
      icon: <MedicineBoxTwoTone twoToneColor="#f09c96" />,
    },
    {
      label: "Pharmacy 3",
      key: "3",
      icon: <MedicineBoxTwoTone twoToneColor="#f09c96" />,
    },
  ];
  const menuProps = {
    items,
    selectable: true,
    defaultSelectedKeys: ["1"],
    onClick: handleMenuClick,
  };

  return (
    <Modal
      open={props.open}
      footer={null}
      onCancel={handleClose}
      centered
      className="style-modal"
      width={600} // Width of the Modal
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
            name="patientsignupform"
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
              name="phoneNumber"
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
                  pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
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
              name="zipCode"
              label="Zip Code"
              rules={[
                {
                  required: true,
                  message: "Please input your Zip Code!",
                },
                {
                  pattern: /^[0-9]{5}$/,
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
              <Dropdown menu={menuProps} styles={{ color: "black" }}>
                <Button>
                  <Space>
                    {selectedLabel}
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
            <Form.Item>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  border: "1px solid #999999",
                  borderRadius: "18px",
                  padding: "22px 0px",
                  backgroundColor: "#ffe6e2",
                  color: "#000000",
                  marginBottom: "10px",
                }}
                onClick={handlePreliminaryFormClick}
              >
                Preliminary Form
              </Button>
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
      <PreliminaryFormModal
        open={isPreliminaryFormModalOpen}
        handleClose={() => setIsPreliminaryFormModalOpen(false)}
      />
    </Modal>
  );
};

export default PatientSignUpModal;
