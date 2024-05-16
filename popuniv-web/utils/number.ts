export const addCommas = (value: number) => {
  if (!value) return '0';

  const num = value.toString();
  const mod = num.length % 3;

  const isBetweenThreeDigits = (index: number) => {
    return index + 1 < num.length && (index + 1) % 3 === mod;
  };

  return num.split('').reduce((a, v, i) => a + v + (isBetweenThreeDigits(i) ? ',' : ''), '');
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
