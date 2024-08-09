import { publicApi } from '@/utils/ky';
import { LeaderboardResponse } from '@/models/interface';
import Drawer from './drawer';
import OpenButton from './openButton';

const Leaderboard = async () => {
  const res = await publicApi('api/dashboard').json<LeaderboardResponse>();

  const data = Object.entries(res?.data || {})
    .map((item) => ({ groupName: item[0], count: item[1] as number }))
    .sort(
      (a, b) => b.count - a.count || a.groupName.toLowerCase().charCodeAt(0) - b.groupName.toLowerCase().charCodeAt(0)
    );

  return (
    <div className='absolute left-0 top-0 h-full'>
      <OpenButton />
      <Drawer data={data} />
    </div>
  );
};

export default Leaderboard;
