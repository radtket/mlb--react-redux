import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { TeamGlobalStyles } from "./TeamStyles";

const TeamTheme = ({
  PrimaryColor,
  SecondaryColor,
  QuaternaryColor,
  TertiaryColor,
  WikipediaLogoUrl,
  WikipediaWordMarkUrl,
  children,
}) => {
  return (
    <ThemeProvider
      theme={{
        PrimaryColor,
        SecondaryColor,
        QuaternaryColor,
        TertiaryColor,
        WikipediaLogoUrl,
        WikipediaWordMarkUrl,
      }}>
      <TeamGlobalStyles
        theme={{
          PrimaryColor,
          SecondaryColor,
          QuaternaryColor,
          TertiaryColor,
          WikipediaLogoUrl,
          WikipediaWordMarkUrl,
        }}>
        {children}
      </TeamGlobalStyles>
    </ThemeProvider>
  );
};

TeamTheme.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  PrimaryColor: PropTypes.string,
  SecondaryColor: PropTypes.string,
  QuaternaryColor: PropTypes.string,
  TertiaryColor: PropTypes.string,
  WikipediaLogoUrl: PropTypes.string,
  WikipediaWordMarkUrl: PropTypes.string,
};

TeamTheme.defaultProps = {
  PrimaryColor: null,
  SecondaryColor: null,
  QuaternaryColor: null,
  TertiaryColor: null,
  WikipediaLogoUrl: null,
  WikipediaWordMarkUrl: null,
};

export default TeamTheme;
