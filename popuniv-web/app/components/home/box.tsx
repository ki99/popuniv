'use client';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UniversityList from './list';
import Image from 'next/image';

interface IClickBoxProps {
	handleResetCount: () => void;
}

export default function ClickBox({ handleResetCount }: IClickBoxProps) {
	const [count, setCount] = useState(0);
	const [accumulatedCount, setAccumulatedCount] = useState(0);
	const [selectedUniversity, setSelectedUniversity] = useState('popuniv university');

	const sendCountToServer = async () => {
		if (count > 0) {
			// 클릭 횟수가 0보다 큰 경우에만 서버로 전송
			await axios
				.post(`${process.env.NEXT_PUBLIC_API_URL}/api/universities/${selectedUniversity}/clicks`, {
					count: count,
				})
				.then((response) => {
					console.log(`클릭 횟수를 서버로 전송 완료: ${count}`);
					setAccumulatedCount(response.data);
				})
				.catch((error) => {
					console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
				});

			setCount(0); // 클릭 횟수 초기화
			handleResetCount();
		}
	};

	const getDashboard = async (university: string) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/universities/${university}/clicks`);
			console.log('대시보드 데이터를 성공적으로 가져왔습니다.');
			console.log('selectedUniversity의 response.data :' + university + ' ' + response.data);
			setAccumulatedCount(response.data);
		} catch (error) {
			console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
		}
	};

	const handleChangeUniversity = (event: any) => {
		const university = event.target.value;
		setSelectedUniversity(university);
		getDashboard(university);
	};

	const handleImageClick = useCallback(() => {
		setCount((prevCount) => prevCount + 1);
	}, []);

	useEffect(() => {
		const interval = setInterval(sendCountToServer, 500);

		return () => {
			clearInterval(interval); // 컴포넌트가 언마운트되면 interval 정리
		};
	}, [count]);

	return (
		<div>
			<div className="text-lg font-semibold">선택된 대학교 : {selectedUniversity}</div>
			<div className="w-[400px] h-[400px] relative">
				<Image
					src="https://pbs.twimg.com/profile_images/536509461204987905/BGuldKRe_400x400.png"
					alt="사진"
					onClick={handleImageClick}
					fill
					sizes="100vw"
				/>
			</div>
			{/* 클릭할 사진을 추가하고 onClick 이벤트 핸들러 연결 */}
			<div className="flex justify-end mb-2">
				<UniversityList onChange={handleChangeUniversity} />
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-2xl font-bold">현재 클릭 횟수: {count}</div>
				<div className="text-2xl font-bold">나의 클릭 누적 횟수: {accumulatedCount}</div>
			</div>
		</div>
	);
}
