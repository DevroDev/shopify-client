import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//functions
import { emptyUserCart } from "../../../functions/user";
//ant
import { Menu, Grid } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

//redux
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

import Search from "../../forms/Search";

const { SubMenu, Item } = Menu;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    //console.log(e.key)
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    // empty cart from local storage
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    // empty cart from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // empty cart from database
    emptyUserCart(user.token);
    history.push("/login");
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode={md ? "horizontal" : "inline"}
    >
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          className="nav-responsive"
          title={user.email && user.email.split("@")[0]} //name@gmail.com to name
        >
          {user && user.role === "subscriber" && (
            <Item key="setting:1">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item key="setting:1">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-right pt-2">
        <Search />
      </span>
    </Menu>
  );
};

export default RightMenu;
