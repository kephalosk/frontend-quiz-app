import "./DarkModeSwitch.scss";
import React, { ReactElement } from "react";
import useDarkMode from "@/hooks/redux/darkMode/useDarkMode.ts";
import useUpdateDarkMode from "@/hooks/redux/darkMode/useUpdateDarkMode.ts";
import {
  MOON_ICON_D,
  MOON_ICON_SRC,
  SUN_ICON_D,
  SUN_ICON_SRC,
} from "@/globals/constants/Ressources.ts";
import SwitchButton from "@/components/atoms/SwitchButton/SwitchButton.tsx";

const DarkModeSwitch: React.FC = (): ReactElement => {
  const isActive: boolean = useDarkMode();
  const updateDarkMode: (newValue: boolean) => void = useUpdateDarkMode();

  return (
    <div className="darkModeSwitch">
      <svg
        className="darkModeSwitchIcon darkModeSwitchIcon__Sun"
        xmlns={SUN_ICON_SRC}
        viewBox="0 0 24 24"
      >
        <path
          className={`darkModeSwitchIconPath darkModeSwitchIconPath__Sun ${isActive && "darkModeSwitchIconPath--active"}`}
          d={SUN_ICON_D}
        />
      </svg>
      <SwitchButton
        isActive={isActive}
        handleButtonClick={() => updateDarkMode(!isActive)}
      />
      <svg
        className="darkModeSwitchIcon darkModeSwitchIcon__Moon"
        xmlns={MOON_ICON_SRC}
        viewBox="0 0 24 24"
      >
        <path
          className={`darkModeSwitchIconPath darkModeSwitchIconPath__Moon ${isActive && "darkModeSwitchIconPath--active"}`}
          d={MOON_ICON_D}
        />
      </svg>
    </div>
  );
};

export default DarkModeSwitch;
