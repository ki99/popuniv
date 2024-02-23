'use client';

import React, { useEffect, useState, useCallback } from 'react';
import GroupList from './list';
import Image from 'next/image';
import { sendClicks } from '../../app/actions';
import { get } from '../../utils/http';
import { ClickResponse } from '../../models/interface';

export default function ClickBox() {
	const [count, setCount] = useState(0);
	const [accumulatedCount, setAccumulatedCount] = useState(0);
	const [selectedId, setSelectedId] = useState(1);
	const userId = 3; // temp

	const sendCountToServer = async () => {
		if (count > 0) {
			const data = await sendClicks({ selectedId, clickCount: count, userId });
            console.log(data);
			if (data) {
				const { userClickCount, allClickCount } = data;
				setAccumulatedCount(userClickCount);
			}
			setCount(0);
		}
	};

	const getClicks = async (groupId: string) => {
		try {
			const data = await get<ClickResponse>(`/click/${groupId}`);
			if (data) {
				const { userClickCount, allClickCount } = data;
				setAccumulatedCount(userClickCount);
			}
		} catch (error) {
			console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
		}
	};

	const handleChangeGroupId = (event: any) => {
		const groupId = event.target.value;
		setSelectedId(groupId);
		getClicks(groupId);
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
			<div className="text-lg font-semibold">선택된 id : {selectedId}</div>
			<div className="w-[400px] h-[400px] relative">
				<Image
					src="https://pbs.twimg.com/profile_images/536509461204987905/BGuldKRe_400x400.png"
					alt="사진"
					onClick={handleImageClick}
					fill
					sizes="100vw"
				/>
			</div>
			<div className="flex justify-end mb-2">
				<GroupList onChange={handleChangeGroupId} />
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-2xl font-bold">현재 클릭 횟수: {count}</div>
				<div className="text-2xl font-bold">나의 클릭 누적 횟수: {accumulatedCount}</div>
			</div>
		</div>
	);
}
