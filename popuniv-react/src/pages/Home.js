import React from "react";
import ClickBox from "./ClickBox";
import DashBoard from "./DashBoard"; // DashBoard.js 파일의 경로에 따라 적절히 수정해야 합니다.
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import "../index.css"
function Home() {
  const [resetCount, setResetCount] = useState(0);
  const [dashboardData, setDashboardData] = useState(0);

  useEffect(() => {
    console.log("useEffect executed");
    updateDashboardData();

  }, [resetCount]);

  const handlResetClickCount = () => {
    console.log("handlereset executed");
    if (resetCount === 0) {setResetCount(1);} else {setResetCount(0);}
  }

  const updateDashboardData = () => {
    return { popuniv: '1', popunivadmin: "43"};
  };

  return (
    <div className="container">
      <div className="clickbox">
        <ClickBox handleResetClickCount={handlResetClickCount}/>
      </div>
      <div className="dashboard">
        <DashBoard dashboardData={dashboardData}/>
      </div>
    </div>
  );
}

export default Home;