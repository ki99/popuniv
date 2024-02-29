'use client';

import React, { useEffect, useState, useRef } from 'react';
import { DashboardRequest, Group, GroupInfo } from '../../models/interface';
import { get } from '../../utils/http';

interface ListProps {
	onChange: any;
}

export default function List({ onChange }: ListProps) {
	const [list, setList] = useState<GroupInfo[]>([]);
	const listRef = useRef(null);

	const getList = async () => {
		try {
			const data = await get<GroupInfo[], DashboardRequest>('/group', { type: Group.UNIVERSITY });
			setList(data || []);
		} catch (error) {
			console.error('선택 목록을 가져오는 동안 오류가 발생했습니다.', error);
		}
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<select
			className="w-full h-10 rounded shadow-md border-transparent border-r-[8px] px-3 py-2 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-transparent focus:border-r-[8px] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
			ref={listRef}
			onChange={onChange}
		>
			<option value="">조직 선택</option>
			{list.map((group) => (
				<option key={group.id} value={group.id}>
					{group.name}
				</option>
			))}
		</select>
	);
}
