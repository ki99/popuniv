import React from "react";
import ClickBox from "./ClickBox";
import DashBoard from "./DashBoard"; // DashBoard.js 파일의 경로에 따라 적절히 수정해야 합니다.
import SignupButton from "./SignupButton";
import SigninButton from "./SigninButton";
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
    // api get 요청을 해서 json을 받아와서 dashboardData를 업데이트 해줍니다.
    axios.get(`${process.env.REACT_APP_API_URL}/dashboard`)
      .then((response) => {
        console.log(response.data);
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(updateDashboardData, 10000); // 3초마다 sendClickCountToServer 함수 실행
    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트되면 interval 정리
    }
  }, []);

  return (
    <div className="container">
      <div className="clickbox">
        <ClickBox handleResetClickCount={handlResetClickCount}/>
      </div>
      <div className="dashboard">
        <DashBoard dashboardData={dashboardData}/>
      </div>
      <div className="signin">
        <SigninButton />
      </div>
      <div className="signup">
        <SignupButton />
      </div>
    </div>
  );
}

export default Home;