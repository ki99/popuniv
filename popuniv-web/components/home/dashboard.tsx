'use client';

import 'flowbite';
import { Dashboard } from '../../models/interface';
import { addComma } from '../../utils/currency';

interface DashboardProps {
	data: Dashboard[];
}

const Dashboard = ({ data }: DashboardProps) => {
	return (
		<div className="absolute left-0 top-0 h-full">
			<OpenButton />
			<Drawer data={data} />
		</div>
	);
};

export default Dashboard;

const OpenButton = () => {
	return (
		<div className="h-full flex justify-center ml-8">
			<button
				type="button"
				data-drawer-target="drawer-left"
				data-drawer-show="drawer-left"
				data-drawer-placement="left"
				aria-controls="drawer-left"
			>
				<div className="text-center font-bold border-2 rounded-full bg-white opacity-80 p-4">
					리더보드
					<br />
					열기
				</div>
			</button>
		</div>
	);
};

const Drawer = ({ data }: DashboardProps) => {
	return (
		<div
			id="drawer-left"
			className="fixed top-0 left-0 z-40 h-screen w-80 p-4 overflow-y-auto transition-transform -translate-x-full bg-white opacity-90"
			aria-labelledby="drawer-left-label"
		>
			<h5
				id="drawer-left-label"
				className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
			>
				🏆&nbsp;&nbsp;&nbsp;&nbsp;Leaderboard
			</h5>
			<button
				type="button"
				data-drawer-hide="drawer-left"
				aria-controls="drawer-left"
				className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
			>
				<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
				<span className="sr-only">Close menu</span>
			</button>
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
