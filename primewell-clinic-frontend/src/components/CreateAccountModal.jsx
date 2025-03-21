import { Flex, Modal, Form, message, Button, Input, Divider } from "antd";
import { useEffect, useState } from "react";

const CreateAccountModal = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.open) {
      form.resetFields();
      message.destroy();
    }
  }, [props.open]);

  const onFinish = () => {
    message.success("Submit Success!");
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
        <h1 style={{ fontSize: "64px", color: "#333333" }}>Sign up</h1>
        <Flex vertical style={{ width: "100%" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFail}
            autoComplete="off"
          >
            {/* <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                placeholder="example@gmail.com"
                style={{ height: "45px" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
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
            >
              <Input.Password
                placeholder="Enter your password"
                style={{ height: "45px" }}
              />
            </Form.Item> */}
            <Flex
              vertical
              align="center"
              gap="50px"
              style={{
                width: "100%",
              }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="custom-btn"
                  style={{
                    width: "150px",
                    height: "50px",
                    borderRadius: "18px",
                    padding: "12px 0px",
                    backgroundColor: "#f09c96",
                  }}
                >
                  Patient
                </Button>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="custom-btn"
                  style={{
                    width: "150px",
                    height: "50px",
                    borderRadius: "18px",
                    padding: "12px 0px",
                    backgroundColor: "#f09c96",
                  }}
                >
                  Doctor
                </Button>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="custom-btn"
                  style={{
                    width: "150px",
                    height: "50px",
                    borderRadius: "18px",
                    padding: "12px 0px",
                    backgroundColor: "#f09c96",
                  }}
                >
                  Pharmacy
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CreateAccountModal;
