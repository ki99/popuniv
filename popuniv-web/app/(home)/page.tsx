'use client';

import { useState } from 'react';
import ClickBox from '../../components/home/box';
import DashBoard from '../../components/home/dashboard';

const Home = () => {
	const [resetCount, setResetCount] = useState(false);

	const handleResetCount = () => {
		setResetCount(!resetCount);
	};

	return (
		<div>
			<div className="grid grid-cols-2 gap-8">
				<ClickBox handleResetCount={handleResetCount} />
				<DashBoard key={Number(resetCount)} />
			</div>
		</div>
	);
};

export default Home;
