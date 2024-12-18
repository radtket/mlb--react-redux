/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { stubHubTeamHelper } from "../../utils/helpers";

const TeamLogoWrap = styled.div`
  position: ${({ isHomeTeam }) => (isHomeTeam ? "absolute" : "relative")};
  left: ${({ isHomeTeam }) => (isHomeTeam ? "initial" : "-5%")};
  right: ${({ isHomeTeam }) => (isHomeTeam ? "-5%" : "initial")};
  border-right: ${({ isHomeTeam }) =>
    isHomeTeam ? "initial" : `3px solid #fff`};
  border-left: ${({ isHomeTeam }) =>
    isHomeTeam ? `3px solid #fff` : "initial"};
  height: 100%;
  overflow: hidden;
  top: 0;
  transform: skewX(-8deg);
  width: 55%;

  > figure {
    background: ${({
      ColorPrimary,
      ColorSecondary,
      WikipediaWordMarkUrl,
      WikipediaLogoUrl,
    }) =>
      `${ColorPrimary || ColorSecondary} url(${WikipediaWordMarkUrl ||
        WikipediaLogoUrl})`};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: skewX(8deg);
    height: 100%;
    width: 100%;
    margin-left: ${({ isHomeTeam }) => (isHomeTeam ? "-9%" : "9%")};
  }
`;

const SplitLogo = ({ teams, datetime_local }) => {
  return teams.map(({ colors, short_name, home_team, away_team }) => {
    const { WikipediaWordMarkUrl, WikipediaLogoUrl, Key } = stubHubTeamHelper[
      short_name
    ];

    const [ColorPrimary, ColorSecondary] = colors.primary;

    return (
      <TeamLogoWrap
        key={`${Key} ${datetime_local}`}
        isHomeTeam={home_team || !away_team}
        {...{
          ColorPrimary,
          ColorSecondary,
          WikipediaWordMarkUrl,
          WikipediaLogoUrl,
        }}
      >
        <figure />
      </TeamLogoWrap>
    );
  });
};

const TicketedEventHeaderWrap = styled.a`
  height: 200px;
  width: 100%;
  display: block;
  position: relative;
`;

const TicketedEventHeader = ({ performers, datetime_local, url }) => {
  return (
    <TicketedEventHeaderWrap
      className="event-ticket-header"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <SplitLogo {...{ teams: performers, datetime_local }} />
    </TicketedEventHeaderWrap>
  );
};

TicketedEventHeader.propTypes = {
  performers: PropTypes.arrayOf(PropTypes.object).isRequired,
  datetime_local: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default TicketedEventHeader;
