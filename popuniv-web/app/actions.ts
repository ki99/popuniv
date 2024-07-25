'use server';

import { revalidateTag } from 'next/cache';
import { get, put } from '@/utils/http';
import { ClickRequest, ClickRequestBody, ClickResponse, UserInfo } from '@/models/interface';
import { cookies } from 'next/headers';

export const setToken = async (token: string) => {
  cookies().set('token', token);
};

export const getToken = async () => {
  const cookieValue = await cookies().get('token');
  return cookieValue?.value || '';
};

export const deleteToken = () => {
  return cookies().delete('token');
};

export const getUserInfo = async () => {
  try {
    const token = await getToken();
    const data = await get<UserInfo, {}>({ token: token, url: '/api/auth/info' });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const sendClicks = async ({ selectedId, clickCount }: ClickRequest) => {
  const token = await getToken();
  try {
    const data = await put<ClickResponse, ClickRequestBody>({
      token: token,
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
