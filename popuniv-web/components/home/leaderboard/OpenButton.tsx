'use client';

import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

const OpenButton = () => {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className='relative h-full ml-8'>
      <button
        className='absolute top-1/2 transform -translate-y-1/2 w-24'
        type='button'
        data-drawer-target='drawer-left'
        data-drawer-show='drawer-left'
        data-drawer-placement='left'
        aria-controls='drawer-left'
      >
        <div className='text-center font-bold border-2 rounded-full bg-white opacity-80 p-4'>
          리더보드
          <br />
          열기
        </div>
      </button>
    </div>
  );
};

export default OpenButton;
