'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import GroupList from '../list';
import { sendClicks } from '@/app/actions';
import { addComma } from '@/utils/number';
import { api, publicApi } from '@/utils/ky';
import type { ClickResponse, SelectOption, UserInfo } from '@/models/interface';
import type { ResponseBody } from '@/models/http.interface';
import useFetch from '@/hooks/common/useFetch';

import Mascot from 'public/assets/images/mascot.png';

const defaultValue = { value: 1, label: 'Popuniv University' };

const Box = () => {
  const { data: user } = useFetch<UserInfo>(() => api.get('api/auth/info'));

  const [count, setCount] = useState(0);
  const [userClickCount, setUserClickCount] = useState(0);
  const [totalClickCount, setTotalClickCount] = useState(0);

  const [selected, setSelected] = useState<SelectOption>(defaultValue);

  const getClicks = useCallback(async (groupId: number, userInfo?: UserInfo) => {
    try {
      const res: ResponseBody<ClickResponse> = await publicApi.get(`api/click/${groupId}`).json();
      if (res.data) {
        const { userClickCount, totalClickCount } = res.data;

        setTotalClickCount(totalClickCount);
        if (userInfo) {
          setUserClickCount(userClickCount);
        }
      }
    } catch (error) {
      console.error('대시보드 데이터를 가져오는 동안 오류가 발생했습니다.', error);
    }
  }, []);

  const handleChangeGroup = (group: SelectOption) => {
    if (!user) {
      return alert('로그인 후 선택 가능합니다 ٩( ᐛ )و');
    }
    setSelected(group);
    getClicks(group.value, user);
  };

  const handleImageClick = () => {
    setCount((prevCount) => prevCount + 1);
    new Audio('assets/audios/click.wav').play();
  };

  const sendCountToServer = useCallback(async () => {
    if (count > 0) {
      try {
        const res = await sendClicks({ selectedId: selected.value, clickCount: count });
        if (res?.data) {
          const { userClickCount: userClickCountFromServer, totalClickCount: totalClickCountFromServer } = res.data;

          setTotalClickCount(totalClickCountFromServer);
          if (user) {
            setUserClickCount(userClickCountFromServer);
          } else {
            const value = userClickCount + count;
            localStorage.setItem('local_click_count', value.toString());
            setUserClickCount(value);
          }

          setCount(0);
        } else {
          throw new Error();
        }
      } catch {
        alert('클릭이 반영되지 않았습니다.');
      }
    }
  }, [count, selected.value, user, userClickCount]);

  useEffect(() => {
    const interval = setInterval(sendCountToServer, 500);

    return () => {
      clearInterval(interval);
    };
  }, [count, sendCountToServer]);

  useEffect(() => {
    const initialize = () => {
      if (user) {
        const university = user.university;
        setSelected({ value: university.id, label: university.name });

        getClicks(university.id, user);
      } else {
        getClicks(defaultValue.value);

        const localClickCount = Number(localStorage.getItem('local_click_count'));
        setUserClickCount(localClickCount);
      }
    };

    initialize();
  }, [, getClicks, user]);

  return (
    <div className='h-[76vh] flex flex-col items-center justify-between'>
      <div className='flex flex-col gap-6'>
        <div className='w-[240px]'>
          <GroupList value={selected} onChange={handleChangeGroup} />
        </div>

        <div className='flex flex-col gap-4 text-white text-center'>
          <div className='flex flex-col gap-2'>
            <div className='font-semibold'>전체 클릭 횟수</div>
            <div className='text-2xl font-extrabold lining-nums slashed-zero'>{addComma(totalClickCount)}</div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='font-semibold'>내 누적 클릭 횟수</div>
            <div className='text-2xl font-extrabold lining-nums slashed-zero'>{addComma(userClickCount)}</div>
          </div>

          <div className='mt-2'>
            <div className='text-4xl font-extrabold underline decoration-8 decoration-yellow-300 lining-nums slashed-zero'>
              {addComma(count)}
            </div>
          </div>
        </div>
      </div>

      <div className='items-end'>
        <div className='min-w-[300px] w-[300px] h-[300px] relative'>
          <Image src={Mascot} alt='캐릭터' onClick={handleImageClick} fill sizes='100vw' />
        </div>
      </div>
    </div>
  );
};

export default Box;
