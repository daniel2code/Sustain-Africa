import React from "react";
import "./Home.scss";

const AdminHome = () => {
  const adminLevels = [
    { level: 1, title: "super admin" },
    { level: 1, title: "super admin" },
    { level: 1, title: "super admin" },
    { level: 1, title: "super admin" },
  ];

  return (
    <div className="home">
      <div className="home-wrapper">
        <div className="home-card-box">
          {adminLevels.map((item) => {
            return <div className="home-card">{item.title}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
