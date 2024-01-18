import React from "react";
import ClickBox from "./ClickBox";
import DashBoard from "./DashBoard"; // DashBoard.js 파일의 경로에 따라 적절히 수정해야 합니다.
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
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
    // here 구현해라
    return { popuniv: '1', popunivadmin: "43"};
  };

  return (
    <div>
      <ClickBox handleResetClickCount={handlResetClickCount}/>
      <DashBoard dashboardData={dashboardData}/>
    </div>
  );
}

export default Home;