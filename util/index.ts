const UTIL = {
  limitDecimalPlaces: (num: number, decimalPlaces: number): number => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  },
  splitNumberByDecimal: (number: string): string | [string, string] => {
    const stringValue = number;
    const decimalIndex = stringValue.indexOf(".");

    if (decimalIndex !== -1) {
      // If the decimal point is present
      const integerPart = stringValue.substring(0, decimalIndex);
      const decimalPart = stringValue.substring(decimalIndex + 1);
      return [integerPart, decimalPart];
    } else {
      // If there is no decimal point
      return number.toString();
    }
  },
};
export default UTIL;
