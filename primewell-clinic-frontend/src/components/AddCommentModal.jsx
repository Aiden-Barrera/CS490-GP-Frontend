import { Flex, Modal, Form, message, Button, Input, notification } from "antd";
import { useEffect, useState } from "react";
import apiDB from './../api.js';


const { TextArea } = Input;

const AddCommentModal = (props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (props.open) {
      form.resetFields();
      message.destroy();
    }
  }, [props.open]);

  const onFinish = async (value) => {
    const newValue = {
      ...value,
      Patient_ID: props.Patient_ID,
      Forum_ID: props.Forum_ID,
    };
    console.log(newValue);
    try {
      // const res = await axios.post("http://localhost:3000/comments", newValue);
      const res = await apiDB.post("/comments", newValue);
      console.log("Added Comment: ", res.data);
      props.commentCreated(true);
      handleClose();
    } catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            api.open({
              message: 'Invalid Credentials!',
              description: 'Must be Signed In to leave a Comment.',
            });
          } else {
            console.log("Error Fetching Comments: ", err);
          }
        }
    }
  };

  const onFail = () => {
    message.error("Unable to Add Exercise");
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
      {contextHolder}
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
        <h1 style={{ fontSize: "50px", color: "#333333" }}>Add Comment</h1>
        <Flex vertical style={{ width: "100%" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFail}
            autoComplete="off"
          >
            <Form.Item
              name="Comment_Text"
              label=""
              rules={[
                {
                  required: true,
                  message: "Comment Required",
                },
              ]}
            >
              <TextArea placeholder="Comment" style={{ height: "300px" }} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  borderRadius: "18px",
                  padding: "22px 0px",
                  backgroundColor: "#A3C3A4",
                }}
              >
                Add Comment
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AddCommentModal;
