import React, { useEffect } from "react";
import "./App.css";
import { Layout, message } from "antd";
// import LoadingBar from "react-redux-loading-bar";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import DealsList from "./pages/DealsList/DealsList";
import NewDeal from "./pages/NewDeal/NewDeal";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import VerifyEmail from "./pages/Authentication/VerifyEmail";
import VerifyPhone from "./pages/Authentication/VerifyPhone";
import Profile from "./pages/Profile/Profile";
import OtherProfile from "./pages/Profile/OtherProfile";
import DealPage from "./pages/DealPage/DealPage";
import EditDeal from "./pages/EditDeal/EditDeal";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { bearerInstance } from "./utils/API";

function App() {
  useEffect(() => {
    if (userState?.userData?.is_email_verified === "0" && "2" === "1") {
      history.push("/verify-email");
    }
    //eslint-disable-next-line
  }, []);

  const userState = useSelector((state) => state.user);
  const hasError = useSelector((state) => state.data.hasError);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "DESTROY_SESSION" });
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      window.location.assign("/login");
    }, 500);
  };

  bearerInstance.interceptors.request.use(
    function (config) {
      if (userState?.userData?.token) {
        config.headers.Authorization = `Bearer ${userState?.userData?.token}`;
      }
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );

  bearerInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    function (error) {
      if (error?.response?.status === 500) {
        return message.warning("Server is down, please try later!");
      }

      if (error?.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

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
        {!hasError ? (
          <Switch>
            <Route exact path="/" component={DealsList} />
            <Route exact path="/new-deal" component={NewDeal} />
            <Route exact path="/edit-deal/:id" component={EditDeal} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/verify-email" component={VerifyEmail} />
            <Route exact path="/add-phone" component={VerifyPhone} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/user/:id/profile" component={OtherProfile} />
            <Route exact path="/deal/:id" component={DealPage} />
          </Switch>
        ) : (
          <ErrorBoundary />
        )}
      </Layout>
    </div>
  );
}

export default App;
