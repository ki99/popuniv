import ClickBox from '../../components/home/box';
import Dashboard from '../../components/home/dashboard';
import { DashboardRequest, Group } from '../../models/interface';
import { get } from '../../utils/http';

const Home = async () => {
	// const [type, setType] = useState<GroupType>(Group.UNIVERSITY);
	const data = await get<Dashboard[], DashboardRequest>('/dashboard', { type: Group.UNIVERSITY }, ['dashboard']);

	return (
		<div>
			<ClickBox />
			<Dashboard data={data || []} />
		</div>
	);
};

export default Home;
