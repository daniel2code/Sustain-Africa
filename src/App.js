import "./App.css";
import { Layout } from "antd";
// import LoadingBar from "react-redux-loading-bar";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import DealsList from "./pages/DealsList/DealsList";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
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
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
