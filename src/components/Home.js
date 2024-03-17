import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Register from "./Register";
import Login from "./Login";
import styled from "styled-components";

const Home = ({ setToken }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const setActiveTab = (index) => {
    setTabIndex(index);
  };

  return (
    <div className="container pt-5 pb-5">
      <StyledHeader>PERN ToDo Example</StyledHeader>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <StyledTabList>
          <Tab data-qa="registration-tab">Registration</Tab>
          <Tab data-qa="login-tab">Login</Tab>
        </StyledTabList>

        <StyledTabPanel>
          <Register setActiveTab={setActiveTab} />
        </StyledTabPanel>
        <StyledTabPanel>
          <Login setActiveTab={setActiveTab} setToken={setToken} />
        </StyledTabPanel>
      </Tabs>
    </div>
  );
};

const StyledHeader = styled.h1`
  text-align: center;
  font-weight: bold;
  color: #800080;
  text-shadow: 0 0 1px #800080;
`;

const StyledTabList = styled(TabList)`
  border-bottom: 2px solid #800080;
`;

const StyledTabPanel = styled(TabPanel)`
  background-color: #d8dede;
  background-image: linear-gradient(315deg, #d8dede 0%, #e5bdf6 74%);
  border-radius: 8px;
`;

export default Home;
