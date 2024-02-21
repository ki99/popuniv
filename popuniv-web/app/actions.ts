'use server';

import { revalidateTag } from 'next/cache';
import { put } from '../utils/http';
import { ClickRequest, ClickRequestBody, ClickResponse } from '../models/interface';

export async function sendClicks({ selectedId, clickCount, userId }: ClickRequest) {
	try {
		const data = await put<ClickResponse, ClickRequestBody>(`/click/${selectedId}`, { clickCount, userId });
		revalidateTag('dashboard');
		return data;
	} catch (error) {
		console.error(error);
	}
}
