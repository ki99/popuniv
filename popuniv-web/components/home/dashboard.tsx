'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dashboard } from '../../model/interface';

const Dashboard = () => {
	const [data, setData] = useState<Dashboard[]>([
		// mockup data
		{ key: 'AA대학교', value: 102_298_311 },
		{ key: 'BB대학교', value: 95_128_052 },
	]);

	useEffect(() => {
		// api get 요청을 해서 json을 받아와서 dashboardData를 업데이트 해줍니다.
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/university`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const addComma = (value: number) => {
		const num = value.toString();
		const mod = num.length % 3;
		let res = '';
		for (let i = 0; i < num.length; i++) {
			res += num.charAt(i);
			if (i + 1 < num.length && (i + 1) % 3 == mod) {
				res += ',';
			}
		}
		return res;
	};

	return (
		<div>
			<div className="text-lg font-semibold">대시보드</div>
			<ul className="mt-4 space-y-2">
				{data.map((x) => (
					<li key={x.key}>
						{x.key}: {addComma(x.value)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dashboard;
