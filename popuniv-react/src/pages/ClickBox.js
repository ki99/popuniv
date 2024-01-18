import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function ClickBox({handleResetClickCount}) {
  const [clickCount, setClickCount] = useState(0);
  const [accClickCount, setAccClickCount] = useState(0);

  useEffect(() => {
    const handleDocumentClick = () => {
      setClickCount((prevCount) => prevCount + 1); // 클릭할 때마다 clickCount 상태 업데이트
    };

    document.addEventListener('click', handleDocumentClick); // document에 클릭 이벤트 리스너 등록

    return () => {
      document.removeEventListener('click', handleDocumentClick); // 컴포넌트가 언마운트되면 클릭 이벤트 리스너 제거
    };
  }, []);

  useEffect(() => {
    const sendClickCountToServer = async () => {
      if (clickCount > 0) {
        // 클릭 횟수가 0보다 큰 경우에만 서버로 전송
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/clicks`, {
            group: "popuniv",
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

    const interval = setInterval(sendClickCountToServer, 500); // 3초마다 sendClickCountToServer 함수 실행

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트되면 interval 정리
    };
  }, [clickCount]);

  return (
    <div>
      <h1>클릭 횟수: {clickCount}</h1>
      <h1>누적 횟수: {accClickCount}</h1>
    </div>
  );
}