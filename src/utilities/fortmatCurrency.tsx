/** @format */

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});
export function format(number: number) {
    number.toFixed(2)
  return CURRENCY_FORMAT.format(number);
}
