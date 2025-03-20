import { useState } from "react";
import {Flex} from "antd"
import "./../App.css"

const Home = () => {

    return (
        <>
            <Flex justify="center" align="center" style={{height: "100vh"}}>
                <div className="text-container">
                    <h1 className="title" style={{color: "#ffffff"}}>Empowering healthier lives with expercare and proven results. Your wellness starts here.</h1>
                </div>
            </Flex>
        </>
    )
}

export default Home