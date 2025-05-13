export const getErrorMessageMaxValueLess0: (maxValue: number) => string = (
  maxValue: number,
): string => {
  return `Invalid maxValue: ${maxValue}. Value must be greater than 0!`;
};

export const getErrorMessageNewPositionGreaterMaxValue: (
  newPosition: number,
  maxValue: number,
) => string = (newPosition: number, maxValue: number): string => {
  return `Invalid newPosition: ${newPosition}. Value can't be greater than maxValue: ${maxValue}.`;
};

export const getErrorMessageNewPositionLess0 = (
  newPosition: number,
): string => {
  return `Invalid newPosition: ${newPosition}. Value can't be negative!`;
};

export const getErrorMessageEventKeyNeitherArrowLeftNorArrowRight: (
  eventKey: string,
) => string = (eventKey: string): string => {
  return `Invalid event.key: ${eventKey}. Value must be ArrowLeft or ArrowRight.`;
};

export const getErrorMessageMinValueGreaterMaxValue: (
  minValue: number,
  maxValue: number,
) => string = (minValue: number, maxValue: number): string => {
  return `Invalid minValue: ${minValue}. Value can't be greater than maxValue: ${maxValue}.`;
};

export const getErrorMessageContainerWidthIs0: (
  containerWidth: number,
) => string = (containerWidth: number): string => {
  return `Invalid containerWidth: ${containerWidth}. Value must not be 0!`;
};

export const getErrorMessageCharacterLengthLess0: (
  characterLength: number,
) => string = (characterLength: number): string => {
  return `Invalid characterLength: ${characterLength}. Value must be greater than 0!`;
};

export const ERROR_MESSAGE_SLIDER_KEYBOARD_KEYDOWN_PREFIX: string =
  "Error handling keydown event: ";

export const ERROR_MESSAGE_SLIDER_MOUSE_UPDATE_PREFIX: string =
  "Error handling mouse update event: ";

export const ERROR_MESSAGE_MISSING_OPTION: string = "Options are missing!";

export const ERROR_MESSAGE_PASSWORD_GENERATION_PREFIX: string =
  "Error handling password generation event: ";

export const ERROR_MESSAGE_PASSWORD_COPY_PREFIX: string =
  "Failed to copy text: ";
