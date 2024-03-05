'use client';

import React, { useEffect, useState } from 'react';
import GroupList from './list';
import Image from 'next/image';
import { sendClicks } from '../../app/actions';
import { get } from '../../utils/http';
import { addComma } from '../../utils/number';
import { ClickResponse } from '../../models/interface';
import Mascot from 'public/assets/images/mascot.png';

const ClickBox = () => {
	const token = (typeof window !== 'undefined' && localStorage.getItem('token')) || '';
	const user = (typeof window !== 'undefined' && localStorage.getItem('user')) || null;
	const accumulatedCount = (typeof window !== 'undefined' && Number(localStorage.getItem('accumulated_count'))) || 0;
	const [count, setCount] = useState(0);
	const [clickCount, setClickCount] = useState({ user: 0, all: 0 });
	const [selectedId, setSelectedId] = useState('1');

	const sendCountToServer = async () => {
		if (count > 0) {
			const data = await sendClicks({ selectedId, clickCount: count });
			if (data) {
				const { userClickCount, allClickCount } = data;
				if (token) {
					setClickCount({ user: userClickCount, all: allClickCount });
				} else {
					const value = accumulatedCount + count;
					localStorage.setItem('accumulated_count', value.toString());
					setClickCount({ user: value, all: allClickCount });
				}
				setCount(0);
			}
		}
	};

	const getClicks = async (groupId: string) => {
		try {
			const data = await get<ClickResponse>({ token, url: `/click/${groupId}` });
			if (data) {
				const { userClickCount, allClickCount } = data;
				if (token) {
					setClickCount({ user: userClickCount, all: allClickCount });
				} else {
					setClickCount({ user: accumulatedCount, all: allClickCount });
				}
			}
		} catch (error) {
			console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
		}
	};

	const handleChangeGroupId = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (!token) {
			return alert('로그인 후 선택 가능합니다 ٩( ᐛ )و');
		}
		const groupId = event.target.value;
		setSelectedId(groupId);
		getClicks(groupId);
	};

	const handleImageClick = () => {
		setCount((prevCount) => prevCount + 1);
		new Audio('assets/audios/click.wav').play();
	};

	useEffect(() => {
		if (token && user) {
			setSelectedId(JSON.parse(user).groupId);
		}
	}, [token, user]);

	useEffect(() => {
		const interval = setInterval(sendCountToServer, 500);

		return () => {
			clearInterval(interval);
		};
	}, [count]);

	return (
		<div className="h-[76vh] flex flex-col items-center justify-between">
			<div className="flex flex-col gap-6">
				<div className="w-[240px]">
					<GroupList selectedId={selectedId} onChange={handleChangeGroupId} />
				</div>
				<div className="flex flex-col gap-4 text-white text-center">
					<div className="flex flex-col gap-2">
						<div className="font-semibold">전체 클릭 횟수</div>
						<div className="text-2xl font-extrabold lining-nums slashed-zero">{addComma(clickCount.all)}</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-semibold">내 누적 클릭 횟수</div>
						<div className="text-2xl font-extrabold lining-nums slashed-zero">{addComma(clickCount.user)}</div>
					</div>
					<div className="mt-2">
						<div className="text-4xl font-extrabold underline decoration-8 decoration-yellow-300 lining-nums slashed-zero">
							{addComma(count)}
						</div>
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
};

export default ClickBox;
