import { Flex, Modal, Form, message, Button, Input, Rate } from "antd"
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import axios from "axios"
import { useEffect, useState } from "react"

const desc = ['Very Sad', 'Somewhat Sad', 'Neutral', 'Somewhat Happy', 'Very Happy']
const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

const DailySurvey = () => {
    const [form] = Form.useForm()
    const date = new Date()
    const [rate, setRate] = useState(0.0)

    const onFinish = async (value) => {
        const body = {
            weight: value.weight,
            caloric_intake: value.caloric_intake,
            water_intake: value.water_intake,
            mood: rate
        }
        console.log(body)
    }

    const onFail = () => {

    }

    return (
        <>
            <Flex vertical justify="center" align="center" style={{backgroundColor: "#ffffff", borderRadius: "16px", padding: "25px", width: "100%"}}>
                <h1 style={{fontSize: "64px", color: "#333333"}}>Daily Survey: {`${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`}</h1>
                <Flex vertical style={{width: "50%"}}>
                    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFail} autoComplete="off">
                        <Form.Item name="weight" label="Weight" rules={[
                            {
                                required: true,
                                message: "Please input your Weight!"
                            },
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Input placeholder="Weight (lbs)" style={{width: "150px"}}/><span style={{marginLeft: "5px", fontWeight: "700"}}>lbs</span>
                        </Form.Item>
                        <Form.Item name="caloric_intake" label="Calorie Intake" rules={[
                            {
                                required: true,
                                message: "Please input your Caloric Intake!"
                            },
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Input placeholder="Total calories consumed today (e.g., 2000 Cal)" style={{width: "330px"}}/><span style={{marginLeft: "5px", fontWeight: "700"}}>Calories</span>
                        </Form.Item>
                        <Form.Item name="water_intake" label="Water Intake" rules={[
                            {
                                required: true,
                                message: "Please input your Water Intake!"
                            },
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Input placeholder="Total water intake today (e.g., 64 fl oz)" style={{width: "330px"}}/><span style={{marginLeft: "5px", fontWeight: "700"}}>fl oz</span>
                        </Form.Item>
                        <Form.Item name="mood" label="Mood Scale" rules={[
                            {
                                required: true,
                                message: "Please input your Mood!"
                            },
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Rate allowHalf tooltips={desc} value={rate} onChange={() => setRate} character={({index = 0}) => customIcons[index+1]} style={{
                                fontSize: "42px"
                            }}/>
                        </Form.Item>
                        <Form.Item name="notes" label="Notes" validateTrigger="onSubmit">
                            <Input.TextArea rows={4} placeholder="Enter any challenges or hardships you encountered today" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" 
                                style={{width: "100%", borderRadius: "18px", padding: "22px 0px", backgroundColor: "#f09c96", fontSize: "18px"}}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </>
    )
}

export default DailySurvey