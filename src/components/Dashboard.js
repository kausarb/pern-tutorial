import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

const Dashboard = ({ setToken }) => {
  const [activeNavTab, setActiveNavTab] = useState("findRestaurant");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const callDashboardApi = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    callDashboardApi();
  }, []);

  return (
    <div>
      <NavBar>
        <ul>
          <li
            className={activeNavTab === "findRestaurant" ? "active" : ""}
            onClick={() => setActiveNavTab("findRestaurant")}
          >
            Find a Restaurant
          </li>
          <li
            className={activeNavTab === "toDoList" ? "active" : ""}
            onClick={() => setActiveNavTab("toDoList")}
          >
            To-Do List
          </li>
        </ul>
        <LogoutButton onClick={() => handleLogout()}>Logout</LogoutButton>
      </NavBar>
      <h3>Welcome Back Kausar!</h3>
      {activeNavTab === "findRestaurant" ? (
        // Add content for "Find a Restaurant" tab
        <div>Content for Find a Restaurant</div>
      ) : (
        <>
          <InputTodo />
          <ListTodos />
        </>
      )}
    </div>
  );
};

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightblue;
  padding: 10px;

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    align-items: center;
    li {
      cursor: pointer;
      margin-right: 20px;
      font-weight: bold;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const LogoutButton = styled.button`
  cursor: pointer;
  background-color: #000;
  color: #fff;
  padding: 5px;
  border: none;
  border-radius: 5px;
`;

export default Dashboard;
