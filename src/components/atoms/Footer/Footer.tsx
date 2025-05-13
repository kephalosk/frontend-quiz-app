import "./Footer.scss";
import React, { ReactElement } from "react";
import {
  FRONTEND_MENTOR_SRC,
  GITHUB_SRC,
} from "@/globals/constants/Ressources.ts";
import {
  FRONTEND_MENTOR_NAME,
  FRONTEND_MENTOR_PREFIX,
  FRONTEND_MENTOR_SUFFIX,
  GITHUB_PROFILE_NAME,
} from "@/globals/constants/Constants.ts";

const Footer: React.FC = (): ReactElement => {
  return (
    <footer className="attribution">
      <span className="attributionPrefix">{FRONTEND_MENTOR_PREFIX}</span>
      <a
        className="attributionFrontendMentor"
        href={FRONTEND_MENTOR_SRC}
        target="_blank"
      >
        {FRONTEND_MENTOR_NAME}
      </a>
      <span className="attributionSuffix">{FRONTEND_MENTOR_SUFFIX}</span>
      <a
        className="attributionPersonalProfile"
        href={GITHUB_SRC}
        target="_blank"
      >
        {GITHUB_PROFILE_NAME}
      </a>
    </footer>
  );
};

export default Footer;
