import React from 'react';
import { Dashboard } from '../../models/interface';
import { addComma } from '../../utils/currency';

interface IDashboardProps {
	data: Dashboard[];
}

const Dashboard = ({ data }: IDashboardProps) => {
	return (
		<div>
			<div className="text-lg font-semibold">대시보드</div>
			<ul className="mt-4 space-y-2">
				{data?.map((x) => (
					// 	{ key: 'AA대학교', value: 95_128_052 },
					<li key={x.key}>
						{x.key}: {addComma(x.value)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dashboard;
