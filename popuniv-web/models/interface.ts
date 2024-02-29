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
	group_name: string;
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
	email: string;
	password: string;
	passwordCheck: string;
	nickname: string;
}

export interface SigninRequest {
	email: string;
	password: string;
}
