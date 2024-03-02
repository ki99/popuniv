'use client';

import React, { useEffect, useState, useRef } from 'react';
import { LeaderboardRequest, Group, GroupInfo } from '../../models/interface';
import { get } from '../../utils/http';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ListProps {
	selectedId: number;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	register?: UseFormRegister<FieldValues>;
}

const List = React.forwardRef(function List({ selectedId, onChange, register }: ListProps) {
	const [list, setList] = useState<GroupInfo[]>([]);
	const listRef = useRef(null);

	const getList = async () => {
		try {
			const data = await get<GroupInfo[], LeaderboardRequest>({ url: '/group', param: { type: Group.UNIVERSITY } });
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
			value={selectedId}
			{...register}
		>
			{list.map((group) => (
				<option key={group.id} value={group.id}>
					{group.name}
				</option>
			))}
		</select>
	);
});

export default List;
