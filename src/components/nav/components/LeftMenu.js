import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu,Badge, Grid } from "antd";

import {
  AppstoreOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
const { useBreakpoint } = Grid;
const { Item } = Menu;

const LeftMenu = () => {
  const [current, setCurrent] = useState("home");
  let { cart } = useSelector((state) => ({ ...state }));
  const { md } = useBreakpoint();

  const handleClick = (e) => {
    //console.log(e.key)
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode={md ? "horizontal" : "inline"}>
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>
    </Menu>
  );
};

export default LeftMenu;
