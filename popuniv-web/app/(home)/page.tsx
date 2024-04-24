import ClickBox from '../../components/home/box';
import Leaderboard from '../../components/home/leaderboard';
import { ClickResponse, SelectOption } from '../../models/interface';
import { TOKEN, USER } from '../../utils/constants';
import { get } from '../../utils/http';

const Home = async () => {
	const group = USER && JSON.parse(USER)?.group;
	const selectedGroup: SelectOption = { value: group?.id || 1, label: group?.name || 'Default University' };
	const initialCount = (await get<ClickResponse>({ token: TOKEN, url: `/click/${selectedGroup.value}` })) || {
		userClickCount: 0,
		allClickCount: 0,
	};

	return (
		<div>
			<ClickBox selectedGroup={selectedGroup} initialCount={initialCount} />
			{/* @ts-expect-error Server Component */}
			<Leaderboard />
		</div>
	);
};

export default Home;
