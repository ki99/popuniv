'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import GroupList from './list';
import { sendClicks } from '../../app/actions';
import useQuery from '../../hooks/common/useQuery';
import { addCommas } from '../../utils/number';
import type { ClickResponse, SelectOption } from '../../models/interface';
import Mascot from 'public/assets/images/mascot.png';

const ClickBox = () => {
	const [count, setCount] = useState(0);
	const [clickCount, setClickCount] = useState({ user: 0, all: 0 });
	// 로그인하지 않은 사용자의 Default University 클릭 횟수
	const accumulatedCount = (typeof window !== undefined && Number(localStorage.getItem('accumulated_count'))) || 0;

	const token = (typeof window !== undefined && localStorage.getItem('token')) || undefined;
	const user = (typeof window !== undefined && localStorage.getItem('user')) || null;
	const group = user && JSON.parse(user)?.group;
	const defaultValue: SelectOption = useMemo(() => {
		return { value: group?.id || 1, label: group?.name || 'Default University' };
	}, [group]);

	const [selected, setSelected] = useState<SelectOption>(defaultValue);

	const { data } = useQuery<ClickResponse>({
		token,
		url: `/click/${selected.value}`,
	});

	useEffect(() => {
		if (data) {
			const { userClickCount, allClickCount } = data;
			if (token) {
				setClickCount({ user: userClickCount, all: allClickCount });
			} else {
				setClickCount({ user: accumulatedCount, all: allClickCount });
			}
		}
	}, [accumulatedCount, data, token]);

	const handleChangeGroup = (group: SelectOption) => {
		if (!token) {
			return alert('로그인 후 선택 가능합니다 ٩( ᐛ )و');
		}
		setSelected(group);
	};

	const handleImageClick = () => {
		setCount((prevCount) => prevCount + 1);
		new Audio('assets/audios/click.wav').play();
	};

	const sendCountToServer = useCallback(async () => {
		if (count > 0) {
			const data = await sendClicks({ selectedId: selected.value, clickCount: count });
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
	}, [accumulatedCount, count, selected.value, token]);

	useEffect(() => {
		const interval = setInterval(sendCountToServer, 500);

		return () => {
			clearInterval(interval);
		};
	}, [count, sendCountToServer]);

	return (
		<div className="h-[76vh] flex flex-col items-center justify-between">
			<div className="flex flex-col gap-6">
				<div className="w-[240px]">
					<GroupList value={selected} onChange={handleChangeGroup} />
				</div>
				<div className="flex flex-col gap-4 text-white text-center">
					<div className="flex flex-col gap-2">
						<div className="font-semibold">전체 클릭 횟수</div>
						<div className="text-2xl font-extrabold lining-nums slashed-zero">{addCommas(clickCount.all)}</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-semibold">내 누적 클릭 횟수</div>
						<div className="text-2xl font-extrabold lining-nums slashed-zero">{addCommas(clickCount.user)}</div>
					</div>
					<div className="mt-2">
						<div className="text-4xl font-extrabold underline decoration-8 decoration-yellow-300 lining-nums slashed-zero">
							{addCommas(count)}
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
