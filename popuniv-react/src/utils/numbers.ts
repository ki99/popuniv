/**
 *
 * @param value 콤마(,)로 구분할 정수
 * @returns 3자리마다 콤마(,)로 구분된 숫자 문자열
 */
export function commaizeNumber(value: number | string): string {
  const numericString = String(value)
  const commaizeRegExp = /(\d)(?=(\d\d\d)+(?!\d))/g
  return numericString.replace(commaizeRegExp, '$1,')
}

/**
 *
 * @param order 숫자
 * @returns 랭킹
 */
export const orderToRank = (order: number, suffix = false): string => {
  switch (order) {
    case 1:
      return '🥇'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return `${order.toString()}${suffix && '등'}`
  }
}
