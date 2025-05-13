const correctValuesThatAreTooSmall = (
  newValue: number,
  minValue: number,
): number => {
  return newValue < minValue ? minValue : newValue;
};

export default correctValuesThatAreTooSmall;
