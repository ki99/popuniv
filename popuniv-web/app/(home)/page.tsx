import Box from '@/components/home/box/index';
import Leaderboard from '@/components/home/leaderboard/index';

const Home = async () => {
  return (
    <div>
      <Box />
      {/* @ts-expect-error Server Component */}
      <Leaderboard />
    </div>
  );
};

export default Home;
