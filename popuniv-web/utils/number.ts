export const addComma = (value: number) => {
	if (!value) return '0';

	const num = value.toString();
	const mod = num.length % 3;
	let res = '';
	for (let i = 0; i < num.length; i++) {
		res += num.charAt(i);
		if (i + 1 < num.length && (i + 1) % 3 == mod) {
			res += ',';
		}
	}
	return res;
};

export const numToRank = (num: Number): string => {
	switch (num) {
		case 1:
			return '🥇';
		case 2:
			return '🥈';
		case 3:
			return '🥉';
		default:
			return num.toString();
	}
};
