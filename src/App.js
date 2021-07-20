import React, { useEffect } from "react";
import "./App.css";
import { Layout } from "antd";
// import LoadingBar from "react-redux-loading-bar";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import DealsList from "./pages/DealsList/DealsList";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import VerifyEmail from "./pages/Authentication/VerifyEmail";
import VerifyPhone from "./pages/Authentication/VerifyPhone";

function App() {
  useEffect(() => {
    if (userState?.profile?.is_email_verified === "0") {
      history.push("/verify-email");
    }
    //eslint-disable-next-line
  }, []);

  const userState = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <div className="App">
      <Layout className="layout">
        <div className="loading-bar">
          {/* <LoadingBar
            style={{
              backgroundColor: "#1890ff",
              height: "2px",
              position: "fixed",
              top: "0",
            }}
          /> */}
        </div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={DealsList} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/verify-email" component={VerifyEmail} />
          <Route exact path="/add-phone" component={VerifyPhone} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
