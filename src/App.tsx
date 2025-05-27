import "./App.scss";
import React, { ReactElement } from "react";
import Footer from "@/components/atoms/Footer/Footer.tsx";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import HeaderContainer from "@/components/container/HeaderContainer/HeaderContainer.tsx";
import StartPage from "@/pages/StartPage/StartPage.tsx";
import { Route, Routes } from "react-router-dom";
import {
  QUIZ_SUB_PATH,
  RESULT_SUB_PATH,
  STARTPAGE_PATH,
} from "@/globals/constants/Ressources.ts";
import ResultPage from "@/pages/ResultPage/ResultPage.tsx";
import QuizPage from "@/pages/QuizPage/QuizPage.tsx";

const App: React.FC = (): ReactElement => {
  const isDarkModeOn: boolean = useDarkMode();

  return (
    <div className={`app app--${isDarkModeOn ? "darkMode" : "lightMode"}`}>
      <HeaderContainer />
      <Routes>
        <Route path={STARTPAGE_PATH} element={<StartPage />} />
        <Route
          path={`${STARTPAGE_PATH}${QUIZ_SUB_PATH}`}
          element={<QuizPage />}
        />
        <Route
          path={`${STARTPAGE_PATH}${RESULT_SUB_PATH}`}
          element={<ResultPage />}
        />
        <Route path="*" element={<StartPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
