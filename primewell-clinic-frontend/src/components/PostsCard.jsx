import { useEffect, useState } from "react";
import { Flex, Typography, Button } from "antd";
import AddCommentModal from "../components/AddCommentModal";
import {
    CommentOutlined
} from '@ant-design/icons';
import axios from "axios";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const PostsCard = ({ postInfo, info }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentClicked, setCommentClicked] = useState(false);

    const showAddCommentModal = () => {
        setIsAddCommentModalOpen(true);
    };

    const handleAddCommentCancel = () => {
        setIsAddCommentModalOpen(false);
    };

    console.log("Info: ", info);
    console.log("Post Info: ", postInfo);

    const fetchUserName = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/patient/${postInfo?.Patient_ID}`
            );
            const fetchedInfo = res.data;
            console.log("Fetched UserName: ", fetchedInfo);
            setUserInfo(fetchedInfo);
        } catch (err) {
            console.log("Error Fetching UserName: ", err);
        }
    };

    const getComments = async () => {
        try {
            const res2 = await axios.get(`http://localhost:3000/comments/${postInfo.Forum_ID}`);
            const fetchedComments = res2.data;
            console.log("Fetched Comments: ", fetchedComments);
            setComments(fetchedComments);
            // setCommentClicked(true);
        } catch (err) {
            console.log("Error Fetching Comments: ", err);
        }
    };

    useEffect(() => {
        if (postInfo) {
            fetchUserName();
        }
    }, [postInfo]);

    return (
        <Flex
            vertical
            gap="10px"
            style={{
                background: "#ffe6e2",
                borderRadius: "12px",
                padding: "33px 40px",
                overflowY: "auto",
                maxWidth: "100%",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            {/* Top: User & Date */}
            <Flex justify="space-between" align="center">
                <Flex gap="12px" align="center">
                    <img
                        src="/clientIcon.png"
                        alt="Icon"
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <Text strong style={{ fontSize: "20px" }}>
                        {`${userInfo?.First_Name} ${userInfo?.Last_Name}`}
                    </Text>
                </Flex>
                <Text type="secondary" style={{ fontSize: "16px" }}>
                    {postInfo?.Date_Posted && postInfo.Date_Posted.split("T")[0]}
                </Text>
            </Flex>
            <Flex vertical gap="30px">
                <Flex gap="150px" justify="flex-start" align="flex-start">
                    {/* Exercise Info */}
                    <Flex vertical gap="10px" style={{ maxWidth: "400px", flex: 1 }}>
                        <Title level={4} style={{ margin: 0 }}>
                            {postInfo?.Exercise_Name}
                        </Title>
                        <Flex justify="space-between" align="center">
                            <Text type="secondary">Muscle Group:</Text>
                            <Text>{postInfo?.Muscle_Group}</Text>
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <Text type="secondary">Exercise Class:</Text>
                            <Text>{postInfo?.Exercise_Class}</Text>
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <Text type="secondary">Sets & Reps:</Text>
                            <Text>{postInfo?.Sets} Sets @ {postInfo?.Reps} Reps</Text>
                        </Flex>
                        <Flex vertical style={{ marginTop: "8px" }}>
                            <Text type="secondary">Description:</Text>
                            <Paragraph style={{ marginBottom: 0 }}>{postInfo?.Exercise_Description}</Paragraph>
                        </Flex>
                    </Flex>
                    {/* Feedback */}
                    <Flex vertical gap="10px" style={{ maxWidth: "500px", flex: 1 }}>
                        <Title level={4} style={{ margin: "0" }}>{`${userInfo?.First_Name} ${userInfo?.Last_Name}`}'s Feedback</Title>
                        <Paragraph style={{ fontSize: "16px", margin: 0 }}>
                            {postInfo?.Forum_Text}
                        </Paragraph>
                    </Flex>
                </Flex>
                {/* Post Comment Buttons */}
                <Flex gap="50px" justify="flex-start" align="flex-start">
                    <Flex vertical gap="10px" style={{ maxWidth: "auto", flex: 1 }}>
                        <CommentOutlined onClick={() => {
                            getComments();
                            setCommentClicked(!commentClicked);
                        }} />
                    </Flex>
                </Flex>
                <Flex vertical gap="20px" flexDirection="column" style={{ width: "90%", alignSelf: "flex-end" }}>
                    {/* Pink Comment Box */}
                    {commentClicked && comments.length > 0 ? (
                        <div
                            style={{
                                background: "#f5b5af",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "99%",
                                height: "auto",
                                border: "1px solid #666666",
                                borderRadius: "8px",
                                padding: "20px",
                                gap: "10px",
                            }}
                        >
                            {comments?.map((comment, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        gap: "15px",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        width: "100%",
                                        borderBottom: index < comments.length - 1 ? "1px solid #eee" : "none",
                                        paddingBottom: "10px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Text strong>{comment.Patient_ID}:</Text>{" "}
                                    <Paragraph style={{ fontSize: "16px", margin: 0, flex: 1 }}>
                                        {comment.Comment_Text}
                                    </Paragraph>
                                    {comment.Date_Created && (
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "12px",
                                                margin: 0,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {dayjs(comment.Date_Created).format("MMM DD,")}
                                        </Text>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : commentClicked ? (
                        <Text type="secondary" style={{ textAlign: "right" }}>No comments yet.</Text>
                    ) : null}

                    {/* Add Comment Button */}
                    {commentClicked && (
                        <Button
                            type="primary"
                            style={{
                                width: "200px",
                                borderRadius: "24px",
                                padding: "22px 22px",
                                backgroundColor: "#A2C3A4",
                                fontSize: "16px",
                                fontWeight: "700",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                marginTop: "20px",
                                alignSelf: "flex-start",
                            }}
                            onClick={() => {
                                showAddCommentModal();
                            }}
                        >
                            Add a Comment
                        </Button>
                    )}

                    <AddCommentModal
                        open={isAddCommentModalOpen}
                        handleClose={handleAddCommentCancel}
                        Patient_ID={info?.patient_id}
                        Forum_ID={postInfo?.Forum_ID}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
export default PostsCard;