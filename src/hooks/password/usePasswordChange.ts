import { useState } from "react";
import { PasswordChangeHook } from "@/globals/models/types/PasswordChangeTypes.ts";

const usePasswordChange = (): PasswordChangeHook => {
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  return { password, handlePasswordChange };
};

export default usePasswordChange;
