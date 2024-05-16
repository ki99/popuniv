import ClickBox from '@/components/home/box';
import Leaderboard from '@/components/home/leaderboard';

const Home = async () => {
  return (
    <div>
      <ClickBox />
      {/* @ts-expect-error Server Component */}
      <Leaderboard />
    </div>
  );
};

export default Home;
