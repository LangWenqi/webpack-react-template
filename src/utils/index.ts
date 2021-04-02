export function moneyFormat (money: string | number) {
  const moneyMumber = Number(money);
  if (isNaN(moneyMumber) || moneyMumber === null) {
    return money;
  }
  const moneyString: string = moneyMumber.toFixed(2);
  return Number(moneyString).toLocaleString();
}
