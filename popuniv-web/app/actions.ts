'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import type { ClickRequest, ClickResponse } from '@/models/interface';
import type { ResponseBody } from '@/models/http.interface';

import { api } from '@/utils/ky';

export const getCookie = (name: string) => {
  cookies().get(name);
};

export const setCookie = (name: string, value: string) => {
  cookies().set(name, value);
};

export const deleteCookie = (name: string) => {
  cookies().delete(name);
};

export const sendClicks = async ({ selectedId, clickCount }: ClickRequest) => {
  try {
    const res: ResponseBody<ClickResponse> = await api.put(`api/click/${selectedId}`, { json: { clickCount } }).json();
    revalidateTag('leaderboard');
    return res;
  } catch (error) {
    throw new Error();
  }
};

export const updateLeaderboard = () => {
  revalidateTag('leaderboard');
};
