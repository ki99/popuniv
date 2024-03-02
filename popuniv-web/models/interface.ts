export enum Group {
	UNIVERSITY = 'university',
	COMPANY = 'company',
}

export type GroupType = (typeof Group)[keyof typeof Group];

export interface GroupInfo {
	id: number;
	name: string;
}

export interface ClicksByName {
	group_name: string;
	value: number;
}

export interface LeaderboardRequest {
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
	selectedId: number;
	email: string;
	password: string;
	passwordCheck: string;
	nickname: string;
}

export interface SigninRequest {
	email: string;
	password: string;
}
export interface SigninResponse {
	token: string;
}

export interface MessageResponse {
	message: string;
}
