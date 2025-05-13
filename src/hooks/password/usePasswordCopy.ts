import { useState } from "react";
import { ERROR_MESSAGE_PASSWORD_COPY_PREFIX } from "@/globals/constants/ErrorMessages.ts";
import { PasswordCopyHook } from "@/globals/models/types/PasswordCopyTypes.ts";

const usePasswordCopy = (password: string): PasswordCopyHook => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleButtonClick = async (): Promise<void> => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setIsCopied(true);
      } catch (error) {
        console.error(ERROR_MESSAGE_PASSWORD_COPY_PREFIX + error);
      }
    }
  };

  return { isCopied, setIsCopied, handleButtonClick };
};

export default usePasswordCopy;
