'use client';

import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import { addComma, numToRank } from '../../../utils/number';
import { ClicksByName } from '../../../models/interface';

interface LeaderboardProps {
	data: ClicksByName[];
}

const Drawer = ({ data }: LeaderboardProps) => {
	useEffect(() => {
		initFlowbite();
	}, []);

	return (
		<div
			id="drawer-left"
			className="fixed top-0 left-0 z-40 h-screen w-96 p-4 overflow-y-auto transition-transform duration-300 -translate-x-full bg-white opacity-90"
			aria-labelledby="drawer-left-label"
		>
			<h5
				id="drawer-left-label"
				className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
			>
				Leaderboard
			</h5>
			<button
				type="button"
				data-drawer-hide="drawer-left"
				aria-controls="drawer-left"
				className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
			>
				<svg className="w-3 h-3" aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
				<span className="sr-only">Close menu</span>
			</button>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								🏆
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Total Clicks
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((x, index) => (
							<tr
								key={x.group_name}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th className="px-6 py-4">{numToRank(index + 1)}</th>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{x.group_name}
								</th>
								<td className="px-6 py-4">{addComma(x.value)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Drawer;
