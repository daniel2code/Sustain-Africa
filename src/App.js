import React, { useEffect } from "react";
import "./App.scss";
import { Layout, message } from "antd";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
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
import Discussion from "./pages/Discussion/Discussion";
import { bearerInstance, bearerInstanceWithToken } from "./utils/API";
import Notification from "./pages/Notification/Notifiaction";
import { setNotificationCount } from "./redux/user/user.actions";
import Wallet from "./pages/Wallet/Wallet";
import DiscussionMenu from "./pages/Discussion/DiscussionMenu";
import Instructions from "./pages/Instructions/instructons";

function App() {
  const userState = useSelector((state) => state.user);
  const user = useSelector((state) => state?.user?.userData);
  const hasError = useSelector((state) => state.data.hasError);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.user?.userData?.id);

  const updateUserStatus = (status) => {
    const formdata = new FormData();
    formdata.append("update_type", "user_status");
    formdata.append("update_value", status);

    bearerInstanceWithToken(user.token)
      .post(`/edit_profile?update_type=user_status&update_value=${status}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Confirm user when they want to exit the app
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("unload", updateUserStatus(0));

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("unload", updateUserStatus(0));
  //   };
  // }, []);

  useEffect(() => {
    if (userState?.userData?.is_email_verified === "0") {
      history.push("/verify-email");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Sets the online status of user when they login
    // updateUserStatus(1);
  }, []);

  useEffect(() => {
    bearerInstance
      .get("/check_token")
      .then((res) => {
        if (res.data.message === "token valid")
          return bearerInstance.get("/fetch_all_notifications");
      })
      .then((res) => {
        // to be kept
        const notif = res.data.notification_data.filter((cur) => {
          if (userId === cur.sender)
            if (cur.type === "d_r")
              return (
                userId === cur.sender &&
                cur.viewed_sender === 0 &&
                (cur.accepted_at || cur.rejected_at)
              );

          return userId === cur.receiver && cur.viewed_receiver === 0;
        });
        // console.log(notif);
        // console.log(userId);
        dispatch(setNotificationCount(notif.length));
      })
      .catch((err) => {
        console.log("not authenticated");
      });
  }, [userId, dispatch]);

  const logout = () => {
    dispatch({ type: "DESTROY_SESSION" });
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      window.location.assign("/login");
    }, 500);
    // updateUserStatus(0);
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
        // return message.warning(error?.response?.data.message);
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <Layout className="layout">
        <Navbar />
        <div className="layout-body">
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
              <Route exact path="/wallet" component={Wallet} />
              <Route exact path="/user/:id/profile" component={OtherProfile} />
              <Route exact path="/deal/:id" component={DealPage} />
              <Route exact path="/chat/:id" component={Discussion} />
              <Route exact path="/chat" component={DiscussionMenu} />
              <Route exact path="/notifications" component={Notification} />
              <Route exact path="/instructions" component={Instructions} />
            </Switch>
          ) : (
            <ErrorBoundary />
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
