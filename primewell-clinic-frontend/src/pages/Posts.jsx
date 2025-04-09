import { useState } from "react";
import {Flex, Input, Layout} from "antd"

const Posts = () => {

    return (
        <>
            <Flex justify="center" align="center" style={{
            height: "auto", width: "100vw", marginTop: "180px", marginBottom: "100px"
        }}>
            <Flex vertical justify="center" align="center" gap="60px" style={{
                    background: "#ffffff", 
                    borderRadius: "12px",
                    padding: "33px 40px",
                    width: "60%",
                    maxWidth: "60%",
                    overflowY: "auto",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                }}>
                    <h1 className="title" style={{ color: "#373b41", marginBottom: "10px", marginTop: 0, fontFamily: "Poppins"}} >Exercise Posts</h1>
                    <Input placeholder="Search keywords" style={{fontSize: "24px", height: "50px", width: "50%"}}
                        prefix={<img src="/searchIcon.svg" alt="Icon" style={{width: "24px", marginRight: "5px"}}/>}
                    />
                <Flex vertical gap="20px" style={{
                        width: "100%",
                    }}>
                   {/* Where the Post Cards will go */}
                </Flex>
            </Flex>
        </Flex>
        </>
    )
}
export default Posts