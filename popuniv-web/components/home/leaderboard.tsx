import Drawer from './leaderboard/Drawer';
import OpenButton from './leaderboard/OpenButton';
import type { ClicksByName, LeaderboardRequest } from '../../models/interface';
import { Group } from '../../models/interface';
import { get } from '../../utils/http';

const Leaderboard = async () => {
	const data = await get<ClicksByName[], LeaderboardRequest>({
		url: '/dashboard',
		param: { type: Group.UNIVERSITY },
		cacheTag: ['leaderboard'],
	});

	return (
		<div className="absolute left-0 top-0 h-full">
			<OpenButton />
			<Drawer data={data || []} />
		</div>
	);
};

export default Leaderboard;
