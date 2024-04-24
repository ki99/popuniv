import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token');

	const url = request.nextUrl.clone();

	const signinUrl = url.origin + '/signin';
	const signupUrl = url.origin + '/signup';
	const isAuthUrl = url.href === signinUrl || url.href === signupUrl;

	const homeUrl = url.origin + '/';

	if (token && isAuthUrl) {
		return NextResponse.redirect(homeUrl);
	}
}

export const config = {
	matcher: ['/signin', '/signup'],
};
