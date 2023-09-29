import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreAddOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// we destructured items from menu to avaid having to write Menu.item again n again... destucturing lets us use the item directly without having to write Menu.item
const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async (req, res) => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message); //Toast msg not getting displayed!!!
    router.push("/login");
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      style={{ display: "block" }}
    >
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreAddOutlined />}
      >
        <Link href="/" id="link">
          App
        </Link>
      </Item>

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login" id="link">
              Login
            </Link>
          </Item>

          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register" id="link">
              Register
            </Link>
          </Item>
        </>
      )}

      {user != null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          style={{ float: "right" }}
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">Dashboard</Link>
            </Item>
            <Item
              onClick={logout}
              // icon={<LogoutOutlined />}
              // style={{ float: "right" }}
            >
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
