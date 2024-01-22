import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function UniversityList({ onUniversitySelect }) {
  // send request to server to get university list
  const [universityList, setUniversityList] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    const getUniversityList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/universities`);
        console.log("대학교 목록을 성공적으로 가져왔습니다.");
        console.log(response.data);
        setUniversityList(response.data);
      } catch (error) {
        console.error('대학교 목록을 가져오는 동안 오류가 발생했습니다.', error);
      }
    };

    getUniversityList();
  }, []);

  // Select Box에서 대학교 선택 시 호출되는 함수

  return (
    <select ref={listRef} onChange={onUniversitySelect}>
      <option value="">대학교 선택</option>
      {universityList.map((university) => (
        <option key={university.id} value={university.name}>
          {university.name}
        </option>
      ))}
    </select>
  );
}