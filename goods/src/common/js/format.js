export const formatMoney = (num) => {
  if (typeof num !== 'number') {
    throw new Error('传入的值非数字类型');
  }

  let sign = 1;
  let result = ['0', '0', '.'];
  let len;

  num = num.toFixed(2).split('');
  len = num.length - 3;

  for (let i = len - 1; i >= 0; i--) {
    result.push(num[i]);
    if (sign % 3 === 0 && sign < len) {
      result.push(',');
    }
    sign++;
  }

  return result.reverse().join('');
};
