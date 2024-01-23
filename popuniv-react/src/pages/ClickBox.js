import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UniversityList from "./UniversityList";

export default function ClickBox({ handleResetClickCount }) {
  const [clickCount, setClickCount] = useState(0);
  const [accClickCount, setAccClickCount] = useState(0);
  const [selectedUniversity, setSelectedUniversity] = useState('popuniv university');

  const sendClickCountToServer = async () => {
    if (clickCount > 0) {
      // 클릭 횟수가 0보다 큰 경우에만 서버로 전송
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/universities/${selectedUniversity}/clicks`, {
          clickCount: clickCount
        });
        console.log(`클릭 횟수를 서버로 전송 완료: ${clickCount}`);
        setAccClickCount(response.data);
      } catch (error) {
        console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
      }
      setClickCount(0); // 클릭 횟수 초기화
      handleResetClickCount();
    }
  };

  const setAccClickCountWithServer = async (v) => {
    console.log("selected university: " + v);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/universities/${selectedUniversity}/clicks`);
      console.log("대시보드 데이터를 성공적으로 가져왔습니다.");
      console.log("selectedUniversity의 response.data :" + selectedUniversity + " " + response.data);
      setAccClickCount(response.data);
    } catch (error) {
      console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
    }
  };

  const handleUniversitySelect = (event) => {
    console.log("handle university select");
    const v = event.target.value;
    console.log("v : " + v);
    setSelectedUniversity(v);
  };

  useEffect(() => {
    setAccClickCountWithServer(selectedUniversity);
  }, [selectedUniversity]);

  const handleImageClick = useCallback(() => {
    setClickCount((prevCount) => prevCount + 1); // 클릭할 때마다 clickCount 상태 업데이트
  }, []);

  useEffect(() => {

    const interval = setInterval(sendClickCountToServer, 500); // 3초마다 sendClickCountToServer 함수 실행

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트되면 interval 정리
    };
  }, [clickCount, handleResetClickCount]);

  return (
    <div>
      <h3>선택된 대학교 : {selectedUniversity}</h3>
      <img src="https://pbs.twimg.com/profile_images/536509461204987905/BGuldKRe_400x400.png" alt="사진" onClick={handleImageClick} /> {/* 클릭할 사진을 추가하고 onClick 이벤트 핸들러 연결 */}
      <UniversityList onUniversitySelect={handleUniversitySelect} />
      <h1>클릭 횟수: {clickCount}</h1>
      <h1>누적 횟수: {accClickCount}</h1>
    </div>
  );
}