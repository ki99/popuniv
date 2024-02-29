import ClickBox from '../../components/home/box';
import Leaderboard from '../../components/home/leaderboard';
import { LeaderboardRequest, Group } from '../../models/interface';
import { get } from '../../utils/http';

const Home = async () => {
	// const [type, setType] = useState<GroupType>(Group.UNIVERSITY);
	const data = await get<Leaderboard[], LeaderboardRequest>({
		url: '/dashboard',
		param: { type: Group.UNIVERSITY },
		cacheTag: ['leaderboard'],
	});

	return (
		<div>
			<ClickBox />
			<Leaderboard data={data || []} />
		</div>
	);
};

export default Home;
