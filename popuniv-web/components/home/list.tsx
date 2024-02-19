'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { University } from '../../model/interface';

interface IUniversityListProps {
	onChange: any;
}

export default function UniversityList({ onChange }: IUniversityListProps) {
	// send request to server to get university list
	const [universityList, setUniversityList] = useState<University[]>([]);
	const listRef = useRef(null);

	const getUniversityList = async () => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/university`);
			console.log('대학교 목록을 성공적으로 가져왔습니다.');
			console.log(response.data);
			setUniversityList(response.data);
		} catch (error) {
			console.error('대학교 목록을 가져오는 동안 오류가 발생했습니다.', error);
		}
	};

	useEffect(() => {
		getUniversityList();
	}, []);

	return (
		<select
			className="h-10 rounded border border-blue-gray-200 bg-transparent px-3 py-2 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
			ref={listRef}
			onChange={onChange}
		>
			<option value="">대학교 선택</option>
			{universityList.map((university) => (
				<option key={university.id} value={university.name}>
					{university.name}
				</option>
			))}
		</select>
	);
}
