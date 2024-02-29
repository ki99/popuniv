export const addComma = (value: number) => {
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
