export enum Group {
	UNIVERSITY = 'university',
	COMPANY = 'company',
}

export type GroupType = (typeof Group)[keyof typeof Group];

export interface GroupInfo {
	id: number;
	name: string;
}

export interface Dashboard {
	key: string;
	value: number;
}

export interface DashboardRequest {
	type: GroupType;
}

export type ClickRequest = ClickRequestParam & ClickRequestBody;

export interface ClickRequestParam {
	selectedId: number;
}

export interface ClickRequestBody {
	clickCount: number;
	userId: number;
}

export interface ClickResponse {
	userClickCount: number;
	allClickCount: number;
}

export interface SignupRequest {
	loginId: string;
	password: string;
	passwordCheck: string;
	nickname: string;
	email: string;
}

export interface SigninRequest {
	loginId: string;
	password: string;
}
