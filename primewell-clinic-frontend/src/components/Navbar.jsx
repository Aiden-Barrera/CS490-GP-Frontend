import { Link } from "react-router-dom";
import "./../App.css";
import { Layout, Menu, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import UserTypeModal from "./UserTypeModal";
const { Title } = Typography;
const { Header } = Layout;

const Navbar = () => {
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [name, setName] = useState("")

  const showModal = (name) => {
    setName(name)
    setIsUserTypeModalOpen(true)
  };

  const handleClose = () => {
   setIsUserTypeModalOpen(false)
  };

    return (    
        <>
            <Header
                style={{
                display: "flex",
                alignItems: "center",
                width: "100vw",
                padding: "0",
                position: "fixed",
                top: "0",
                zIndex: "1000",
                }}
            >
                <div>
                    <Title
                        style={{
                        color: "#ffffff",
                        margin: "0 35px",
                        fontWeight: "900",
                        fontSize: "48px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        PrimeWell Clinic
                    </Title>
                </div>

                <Menu theme="dark" mode="horizontal" style={{ marginLeft: "auto" }}>
                    <Menu.Item key="1">
                        <Link to="/" style={{ color: "#ffffff" }}>
                        <strong>HOME</strong>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/Posts" style={{ color: "#ffffff" }}>
                        <strong>POSTS</strong>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/Reviews" style={{ color: "#ffffff" }}>
                        <strong>REVIEWS</strong>
                        </Link>
                    </Menu.Item>
                </Menu>
                <Button
                className="custom-btn"
                style={{ marginLeft: "5px" }}
                onClick={() => {
                    showModal("Login");
                }}
                >
                Login
                </Button>
                <Button
                className="custom-btn"
                style={{ margin: "0 25px 0 10px", backgroundColor: "#f09c96" }}
                onClick={() => {
                    showModal("Sign up");
                }}
                >
                Create Account
                </Button>
            </Header>

            <UserTypeModal
                open={isUserTypeModalOpen}
                name={name}
                handleClose={() => handleClose("SignUp")}
            />
        </>
  );
};

export default Navbar;
