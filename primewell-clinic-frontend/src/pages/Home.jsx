import { useState } from "react";
import {Flex} from "antd"
import "./../App.css"

const Home = () => {

    return (
        <>
            <Flex justify="center" align="center" style={{height: "100vh"}}>
                <h1 className="title" style={{color: "#373b41"}}>Welcome to PrimeWell Clinic</h1>
            </Flex>
        </>
    )
}

export default Home