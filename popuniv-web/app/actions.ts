'use server';

import { revalidateTag } from 'next/cache';
import { get, put } from '@/utils/http';
import { ClickRequest, ClickRequestBody, ClickResponse, UserInfo } from '@/models/interface';
import { cookies } from 'next/headers';

export const setToken = async (token: string) => {
  cookies().set('token', token);
};

export const getToken = () => {
  return cookies().get('token')?.value || '';
};

export const deleteToken = () => {
  return cookies().delete('token');
};

export const getUserInfo = async () => {
  try {
    const data = await get<UserInfo, {}>({ token: getToken(), url: '/api/auth/info' });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const sendClicks = async ({ selectedId, clickCount }: ClickRequest) => {
  try {
    const data = await put<ClickResponse, ClickRequestBody>({
      token: getToken(),
      url: `/api/click/${selectedId}`,
      body: { clickCount },
    });
    revalidateTag('leaderboard');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateLeaderboard = () => {
  revalidateTag('leaderboard');
};
