class DateOrderError extends Error {
  constructor() {
    super('인자의 순서가 잘못되었습니다.(endDate < startDate)');
  }
}

export const getTimeDiff = (startDate: Date, endDate: Date): number => {
  if (endDate.getTime() < startDate.getTime()) {
    throw new DateOrderError();
  }

  return endDate.getTime() - startDate.getTime();
};
