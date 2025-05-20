import "./App.scss";
import React, { ReactElement } from "react";
import Footer from "@/components/atoms/Footer/Footer.tsx";
import useDarkMode from "@/hooks/redux/darkMode/selector/useDarkMode.ts";
import HeaderContainer from "@/components/container/HeaderContainer/HeaderContainer.tsx";
import StartPage from "@/pages/StartPage/StartPage.tsx";
import { Route, Routes } from "react-router-dom";
import { STARTPAGE_PATH } from "@/globals/constants/Ressources.ts";
import QuizButtonContainer from "@/components/container/QuizButtonContainer/QuizButtonContainer.tsx";

const App: React.FC = (): ReactElement => {
  const isDarkModeOn: boolean = useDarkMode();

  return (
    <div className={`app app--${isDarkModeOn ? "darkMode" : "lightMode"}`}>
      <HeaderContainer />
      <Routes>
        <Route
          path={STARTPAGE_PATH}
          element={
            <QuizButtonContainer
              isQuestionAnswered={false}
              propagateCorrectSelection={function (
                IsSelectedAnswerCorrect: boolean,
              ): void {
                console.log(
                  "Function not implemented." + IsSelectedAnswerCorrect,
                );
              }}
            />
          }
        />
        {/*TODO*/}
        {/*<Route path="/quiz" element={<QuizPage />} />*/}
        {/*<Route path="/result" element={<ResultPage />} />*/}
        {/* Optional: für unbekannte Pfade */}
        <Route path="*" element={<StartPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
