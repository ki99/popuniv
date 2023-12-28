import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [backendString, setBackendString] = useState('');

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보내고 응답 값을 받아옵니다.
    axios.get('/homestring')
      .then(response => {
        console.log('API 요청 성공', response);
        setBackendString(response.data); // 응답 값을 상태 변수에 저장합니다.
      })
      .catch(error => {
        console.error('API 요청 중 에러가 발생했습니다:', error);
      });
  }, []);
  return (
    <div>
      <h2 className="text-center mt-5 mb-3">Home55</h2>
      <p>Backend에서 가져온 string : {backendString}</p>
    </div>
  );
}