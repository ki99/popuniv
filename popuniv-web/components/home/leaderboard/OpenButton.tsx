'use client';

import { useEffect } from 'react';

import { initFlowbite } from 'flowbite';

const OpenButton = () => {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="relative ml-8 h-full">
      <button
        className="absolute top-1/2 w-24 -translate-y-1/2 transform"
        type="button"
        data-drawer-target="drawer-left"
        data-drawer-show="drawer-left"
        data-drawer-placement="left"
        aria-controls="drawer-left"
      >
        <div className="rounded-full border-2 bg-white p-4 text-center font-bold opacity-80">
          리더보드
          <br />
          열기
        </div>
      </button>
    </div>
  );
};

export default OpenButton;
