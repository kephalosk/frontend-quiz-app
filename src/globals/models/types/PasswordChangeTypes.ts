export type PasswordChangeHook = {
  password: string;
  handlePasswordChange: (value: string) => void;
};
