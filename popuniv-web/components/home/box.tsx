'use client';

import React, { useEffect, useState, useCallback } from 'react';
import GroupList from './list';
import Image from 'next/image';
import { sendClicks } from '../../app/actions';
import { get } from '../../utils/http';
import { ClickResponse } from '../../models/interface';
import Mascot from 'public/assets/images/mascot.png';

export default function ClickBox() {
	const [count, setCount] = useState(0);
	const [accumulatedCount, setAccumulatedCount] = useState(0);
	const [selectedId, setSelectedId] = useState(1);
	const userId = 3; // temp

	const sendCountToServer = async () => {
		if (count > 0) {
			const data = await sendClicks({ selectedId, clickCount: count, userId });
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
		<div className="h-[76vh] flex flex-col items-center justify-between">
			<div className="flex flex-col gap-6">
				<div className="w-[240px]">
					<GroupList onChange={handleChangeGroupId} />
				</div>
				<div className="flex flex-col gap-4 text-white text-center">
					<div className="flex flex-col gap-2">
						<div className="text-lg font-semibold">누적 클릭 횟수</div>
						<div className="text-2xl font-extrabold lining-nums slashed-zero">{accumulatedCount}</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-lg font-semibold">현재 클릭 횟수</div>
						<div className="text-2xl font-extrabold lining-nums slashed-zero">{count}</div>
					</div>
				</div>
			</div>
			<div className="items-end">
				<div className="min-w-[300px] w-[300px] h-[300px] relative">
					<Image src={Mascot} alt="캐릭터" onClick={handleImageClick} fill sizes="100vw" />
				</div>
			</div>
		</div>
	);
}
