import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";
import { Drawer, Button } from "antd";
import Logo from "../../images/logo.png";
import "./NavStyle.css";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <nav className="menuBar">
      <div className="menuCon">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" width="100px" height="50px" />
          </Link>
        </div>
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button className="barsMenu" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Giggle Shop"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default Header;
