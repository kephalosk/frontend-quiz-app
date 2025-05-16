import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import {
  CORRECT_ICON_SRC,
  ERROR_ICON_SRC,
} from "@/globals/constants/Ressources.ts";
import {
  CORRECT_ICON_ALT_TEXT,
  ERROR_ICON_ALT_TEXT,
} from "@/globals/constants/Constants.ts";
import { QuizButtonIconHook } from "@/globals/models/types/QuizButtonTypes.ts";

export default function useQuizButtonIcon(
  status: QuestionStatusEnum,
): QuizButtonIconHook {
  if (
    status === QuestionStatusEnum.CORRECTED ||
    status === QuestionStatusEnum.RIGHT
  ) {
    return {
      showIcon: true,
      src: CORRECT_ICON_SRC,
      alt: CORRECT_ICON_ALT_TEXT,
    };
  }

  if (status === QuestionStatusEnum.WRONG) {
    return { showIcon: true, src: ERROR_ICON_SRC, alt: ERROR_ICON_ALT_TEXT };
  }

  return { showIcon: false, src: "", alt: "" };
}
