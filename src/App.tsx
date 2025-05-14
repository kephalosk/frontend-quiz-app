import "./App.scss";
import React, { ReactElement } from "react";
import DarkModeSwitch from "@/components/container/DarkModeSwitch/DarkModeSwitch.tsx";

const App: React.FC = (): ReactElement => {

  return (
    <div className="app">
      <DarkModeSwitch/>
    </div>
  );
};

export default App;
