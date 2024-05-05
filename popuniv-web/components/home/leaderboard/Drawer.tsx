'use client';

import { useEffect, useRef, useState } from 'react';

import { initFlowbite } from 'flowbite';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { updateLeaderboard } from '@/app/actions';
import useFirstRender from '@/hooks/common/useFirstRender';
import type { ClicksByName } from '@/models/interface';
import { addCommas, numToRank } from '@/utils/number';

interface DrawerProps {
  data: ClicksByName[];
}

const Drawer = ({ data }: DrawerProps) => {
  const [polling, setPolling] = useState(true);

  // Drawer를 default로 보여주기 위함
  const [isInitial, setInitial] = useState(useFirstRender());
  const ref = useRef<any>(null);

  useEffect(() => {
    initFlowbite();

    // Drawer를 default로 보여주기 위해, tranform-none을 강제로 설정했기 때문에
    // Drawer 바깥 영역 클릭 시 Drawer가 닫히게 하는 기능 직접 구현
    const handleMouseDown = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target) && e.button === 0) {
        setInitial(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    // refetch on window focus
    const startPolling = () => setPolling(true);
    const stopPolling = () => setPolling(false);

    window.addEventListener('focus', startPolling);
    window.addEventListener('blur', stopPolling);

    return () => {
      window.removeEventListener('focus', startPolling);
      window.removeEventListener('blur', stopPolling);
    };
  }, []);

  useEffect(() => {
    // refetch on window focus
    if (!polling) return;

    // polling every 10s
    const interval = setInterval(updateLeaderboard, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [polling]);

  return (
    <div
      id="drawer-left"
      ref={ref}
      className={`xs:w-8/12 fixed left-0 top-0 z-40 h-screen w-10/12 overflow-y-auto bg-white p-[2rem] opacity-90 transition-transform duration-300 md:w-7/12 lg:w-5/12 ${
        isInitial ? 'tranform-none' : '-translate-x-full'
      } `}
      aria-labelledby="drawer-left-label"
    >
      <h5
        id="drawer-left-label"
        className="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
      >
        Leaderboard
      </h5>
      <button
        type="button"
        data-drawer-hide="drawer-left"
        aria-controls="drawer-left"
        className="absolute end-[2rem] top-[2rem] inline-flex h-6 w-6 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="h-3 w-3"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>

      {/* 새로고침 버튼 */}
      {/* <button
				type="button"
				className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 absolute top-[2rem] end-[2rem] inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
				onClick={() => {
					startTransition(() => {
						updateLeaderboard();
						toast.success('리더보드가 업데이트되었습니다!');
					});
				}}
			>
				<svg
					className="w-6 h-6 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"
					/>
				</svg>
				<span className="sr-only">Refresh Leaderboard</span>
			</button>
			<ToastContainer /> */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                🏆
              </th>
              <th scope="col" className="px-6 py-3">
                이름
              </th>
              <th scope="col" className="px-6 py-3">
                클릭
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x, index) => (
              <tr
                key={x.group_name}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th className="px-6 py-4">{numToRank(index + 1)}</th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {x.group_name}
                </th>
                <td className="px-6 py-4">{addCommas(x.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drawer;
