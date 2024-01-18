import React from "react";
import ClickBox from "./ClickBox";
import DashBoard from "./DashBoard"; // DashBoard.js 파일의 경로에 따라 적절히 수정해야 합니다.
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

  const updateDashboardData = async () => {
    // try {
    //   const response = await fetch('/api/dashboard');
    //   const data = await response.json();
    //   setDashboardData(data);
    // } catch (error) {
    //   console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
    // }
    setDashboardData(dashboardData+1);
    console.log("dashboardData : ", dashboardData);
  };

  return (
    <div>
      <ClickBox handleResetClickCount={handlResetClickCount}/>
      <DashBoard dashboardData={dashboardData}/>
    </div>
  );
}

export default Home;