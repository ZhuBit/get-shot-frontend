import React from "react";
import { Menu, Avatar } from "antd";
import { withRouter, useLocation } from "react-router-dom";


import "./AppMenu.css";

const AppMenu = ({ history }) => {
    let location = useLocation();

    return (
        <>
            <Menu
                theme="dark"
                selectedKeys={[location.pathname]}
                mode="horizontal"
                className="app-menu-style"
            >
            </Menu>
        </>
    );
};

export default withRouter(AppMenu);
