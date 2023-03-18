const formatLongString = (
  stringValue: string,
  desiredLength: number
): string => {
  let formattedString = "";
  if (stringValue.length > desiredLength) {
    formattedString = stringValue.substring(0, desiredLength) + "...";
  }
  return formattedString;
};

export { formatLongString };
