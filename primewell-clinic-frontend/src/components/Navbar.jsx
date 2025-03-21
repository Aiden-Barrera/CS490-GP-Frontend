import { Link } from "react-router-dom";
import "./../App.css"
import {Layout, Menu, Typography, Button }from "antd";
const {Title} = Typography
const {Header} = Layout

const Navbar = () => {

    return (    
        <Header style={{display: "flex", alignItems: "center", width: "100vw", padding: "0", position: "fixed", top: "0", zIndex: "1000"}}>
            <div>
                <Title style={{color: "#ffffff", margin: "0 35px", fontWeight: "900", fontSize: "48px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>PrimeWell Clinic</Title>
            </div>

            <Menu theme="dark" mode="horizontal" style={{marginLeft: "auto"}}>
                <Menu.Item key="1">
                    <Link to="/" style={{color: "#ffffff"}}><strong>HOME</strong></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/Posts" style={{color: "#ffffff"}}><strong>POSTS</strong></Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/Reviews" style={{color: "#ffffff"}}><strong>REVIEWS</strong></Link>
                </Menu.Item>
            </Menu>
            <Button className="custom-btn" style={{marginLeft: "5px"}}>Login</Button>
            <Button className="custom-btn" style={{margin: "0 25px 0 10px", backgroundColor: "#f09c96"}}>Create Account</Button>
        </Header>
    )
}

export default Navbar