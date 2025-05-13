import "./App.scss";
import { HEADLINE_TEXT } from "@/globals/constants/Constants.ts";
import Headline from "@/components/atoms/Headline/Headline.tsx";
import PasswordContainer from "@/components/container/PasswordContainer/PasswordContainer.tsx";
import ContentContainer from "@/components/container/ContentContainer/ContentContainer.tsx";
import Footer from "@/components/atoms/Footer/Footer.tsx";
import { PasswordChangeHook } from "@/globals/models/types/PasswordChangeTypes.ts";
import usePasswordChange from "@/hooks/password/usePasswordChange.ts";
import React, { ReactElement } from "react";

const App: React.FC = (): ReactElement => {
  const { password, handlePasswordChange }: PasswordChangeHook =
    usePasswordChange();

  return (
    <div className="app">
      <Headline title={HEADLINE_TEXT} />
      <PasswordContainer password={password} />
      <ContentContainer propagateValue={handlePasswordChange} />
      <Footer />
    </div>
  );
};

export default App;
