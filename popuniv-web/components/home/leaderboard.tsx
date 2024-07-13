import Drawer from './leaderboard/Drawer';
import OpenButton from './leaderboard/OpenButton';
import { Group, LeaderboardRequest, LeaderboardResponse } from '../../models/interface';
import { get } from '../../utils/http';

const Leaderboard = async () => {
  const res = await get<LeaderboardResponse, LeaderboardRequest>({
    url: '/api/dashboard',
    param: { type: Group.UNIVERSITY },
    cacheTag: ['leaderboard'],
  });
  const data = Object.entries(res?.data || {}).map((item) => ({ groupName: item[0], count: item[1] }));

  return (
    <div className='absolute left-0 top-0 h-full'>
      <OpenButton />
      <Drawer data={data} />
    </div>
  );
};

export default Leaderboard;
