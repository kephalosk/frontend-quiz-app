import React, { useEffect, useState } from "react";

const useCopyStatus = (
  password: string,
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  useEffect(() => {
    if (password !== oldPassword) {
      setOldPassword(password);
      setIsCopied(false);
    }
  }, [oldPassword, password, setIsCopied]);
};

export default useCopyStatus;
