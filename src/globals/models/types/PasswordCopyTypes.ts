export type PasswordCopyHook = {
  setIsCopied: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isCopied: boolean;
  handleButtonClick: () => Promise<void>;
};
