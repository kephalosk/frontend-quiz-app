import "./App.scss";
import React, { ReactElement } from "react";
import QuizButton from "@/components/container/QuizButton/QuizButton.tsx";
import { QuestionPositionEnum } from "@/globals/models/enums/QuestionPositionEnum.ts";
import { QuestionStatusEnum } from "@/globals/models/enums/QuestionStatusEnum.ts";
import Footer from "@/components/atoms/Footer/Footer.tsx";
import DarkModeSwitch from "@/components/container/DarkModeSwitch/DarkModeSwitch.tsx";

const App: React.FC = (): ReactElement => {
  return (
    <div className="app">
      <DarkModeSwitch />
      <QuizButton
        text={"4.5 : 1"}
        position={QuestionPositionEnum.A}
        status={QuestionStatusEnum.DEFAULT}
        handleButtonClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isDisabled={false}
      />
      <QuizButton
        text={"4.5 : 1"}
        position={QuestionPositionEnum.A}
        status={QuestionStatusEnum.SELECTED}
        handleButtonClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isDisabled={false}
      />
      <QuizButton
        text={"4.5 : 1"}
        position={QuestionPositionEnum.A}
        status={QuestionStatusEnum.WRONG}
        handleButtonClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isDisabled={false}
      />
      <QuizButton
        text={"4.5 : 1"}
        position={QuestionPositionEnum.A}
        status={QuestionStatusEnum.CORRECTED}
        handleButtonClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isDisabled={false}
      />
      <QuizButton
        text={"4.5 : 1"}
        position={QuestionPositionEnum.A}
        status={QuestionStatusEnum.RIGHT}
        handleButtonClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isDisabled={false}
      />
      <Footer />
    </div>
  );
};

export default App;
