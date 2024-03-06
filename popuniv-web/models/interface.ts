export enum Group {
	UNIVERSITY = 'university',
	COMPANY = 'company',
}

export type GroupType = (typeof Group)[keyof typeof Group];

export interface GroupInfo {
	id: string;
	name: string;
}

export interface SelectOption {
	readonly value: string;
	readonly label: string;
	readonly color?: string;
	readonly isFixed?: boolean;
	readonly isDisabled?: boolean;
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
	selectedId: string;
}

export interface ClickRequestBody {
	clickCount: number;
}

export interface ClickResponse {
	userClickCount: number;
	allClickCount: number;
}

export interface SignupRequest {
	selectedId: string;
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

export interface UserInfo {
	id: number;
	email: string;
	nickname: string;
	role: string;
	groupId: number;
}
