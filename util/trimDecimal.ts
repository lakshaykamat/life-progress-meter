export default function trimNumberBeforeDecimal(number: string): string  | [string, string] {
    const stringValue = number;
    const decimalIndex = stringValue.indexOf('.');
    if (decimalIndex !== -1) {
      const trimmedValue = stringValue.substring(0, decimalIndex)
      const points = stringValue.substring(stringValue.indexOf('.') + 1);
      return [trimmedValue, points];
    } else {
      return number.toString();
    }
  } 