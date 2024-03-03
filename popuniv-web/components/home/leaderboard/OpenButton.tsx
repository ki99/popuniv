'use client';

import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

const OpenButton = () => {
	useEffect(() => {
		initFlowbite();
	}, []);

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

export default OpenButton;
