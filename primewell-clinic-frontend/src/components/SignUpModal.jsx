import { Flex, Modal, Form, message, Button, Input, Divider } from "antd";
import { useEffect, useState } from "react";

const SignUpModal = (props) => {
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
        <h1 style={{ fontSize: "64px", color: "#333333" }}>{props.name}</h1>
        <Flex vertical style={{ width: "100%", marginBottom: "32px" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFail}
            autoComplete="off"
          >
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

export default SignUpModal;
