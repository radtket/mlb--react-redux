import React from "react";
import PropTypes from "prop-types";
import tinycolor from "tinycolor2";
import { ThemeProvider } from "styled-components";
import { TeamGlobalStyles } from "./TeamStyles";
import { LightenOrDarkenColor } from "../../utils/helpers";

const TeamTheme = ({
  PrimaryColor,
  SecondaryColor,
  QuaternaryColor,
  TertiaryColor,
  WikipediaLogoUrl,
  WikipediaWordMarkUrl,
  children,
}) => {
  const PrimaryColorHash = `#${PrimaryColor}`;
  const SecondaryColorHash = `#${SecondaryColor}`;
  const QuaternaryColorHash = `#${QuaternaryColor}`;
  const TertiaryColorHash = `#${TertiaryColor}`;
  const PrimaryColorHover = LightenOrDarkenColor(PrimaryColorHash);
  const SecondaryColorHover = LightenOrDarkenColor(SecondaryColorHash);
  const QuaternaryColorHover = LightenOrDarkenColor(QuaternaryColorHash);
  const TertiaryColorHover = LightenOrDarkenColor(TertiaryColorHash);

  const MostReadableOnPrimary = tinycolor
    .mostReadable(PrimaryColorHash, [
      SecondaryColorHash,
      QuaternaryColorHash,
      TertiaryColorHash,
    ])
    .toHexString();

  const MostReadableOnSecondary = tinycolor
    .mostReadable(SecondaryColorHash, [
      PrimaryColorHash,
      QuaternaryColorHash,
      TertiaryColorHash,
    ])
    .toHexString();

  const TableRosterPlayerLinkColor = tinycolor
    .mostReadable("#eceff1", [
      PrimaryColorHash,
      SecondaryColorHash,
      QuaternaryColorHash,
      TertiaryColorHash,
    ])
    .toHexString();

  const PrimaryOrSecondaryOnWhite = tinycolor
    .mostReadable(`#FFF`, [PrimaryColorHash, SecondaryColorHash])
    .toHexString();

  const PrimaryColorAccent = tinycolor
    .mostReadable(PrimaryColorHash, [SecondaryColorHash, "#fff", "#000"])
    .toHexString();

  const PrimaryTextOnSecondaryBg = () => {
    if (tinycolor.isReadable(SecondaryColorHash, PrimaryColorHash, {})) {
      return PrimaryColorHash;
    }

    return MostReadableOnSecondary;
  };

  const SecondaryTextOnPrimaryBg = () => {
    if (tinycolor.isReadable(PrimaryColorHash, SecondaryColorHash, {})) {
      return SecondaryColorHash;
    }

    return MostReadableOnPrimary;
  };

  return (
    <ThemeProvider
      theme={{
        PrimaryColor: PrimaryColorHash,
        SecondaryColor: SecondaryColorHash,
        QuaternaryColor: QuaternaryColorHash,
        TertiaryColor: TertiaryColorHash,
        PrimaryColorHover,
        SecondaryColorHover,
        QuaternaryColorHover,
        TertiaryColorHover,
        WikipediaLogoUrl,
        WikipediaWordMarkUrl,
        PrimaryColorAccent,
        PrimaryTextOnSecondaryBg: PrimaryTextOnSecondaryBg(),
        SecondaryTextOnPrimaryBg: SecondaryTextOnPrimaryBg(),
        MostReadableOnPrimary,
        MostReadableOnSecondary,
        PrimaryOrSecondaryOnWhite,
        PrimaryOrSecondaryOnWhiteHover: LightenOrDarkenColor(
          PrimaryOrSecondaryOnWhite
        ),
        TableRosterPlayerLinkColor,
        TableRosterPlayerLinkColorHover: LightenOrDarkenColor(
          TableRosterPlayerLinkColor
        ),
      }}>
      <TeamGlobalStyles
        theme={{
          PrimaryColor: PrimaryColorHash,
          SecondaryColor: SecondaryColorHash,
          QuaternaryColor: QuaternaryColorHash,
          TertiaryColor: TertiaryColorHash,
          PrimaryColorHover,
          SecondaryColorHover,
          QuaternaryColorHover,
          TertiaryColorHover,
          WikipediaLogoUrl,
          WikipediaWordMarkUrl,
          PrimaryColorAccent,
          PrimaryTextOnSecondaryBg: PrimaryTextOnSecondaryBg(),
          SecondaryTextOnPrimaryBg: SecondaryTextOnPrimaryBg(),
          MostReadableOnPrimary,
          MostReadableOnSecondary,
          PrimaryOrSecondaryOnWhite,
          PrimaryOrSecondaryOnWhiteHover: LightenOrDarkenColor(
            PrimaryOrSecondaryOnWhite
          ),
          TableRosterPlayerLinkColor,
          TableRosterPlayerLinkColorHover: LightenOrDarkenColor(
            TableRosterPlayerLinkColor
          ),
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
