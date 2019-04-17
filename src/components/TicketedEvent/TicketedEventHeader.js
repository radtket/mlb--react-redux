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
    background: ${({ ColorPrimary, ColorSecondary }) =>
      ColorPrimary || ColorSecondary} url("${({
  WikipediaWordMarkUrl,
  WikipediaLogoUrl,
}) => WikipediaWordMarkUrl || WikipediaLogoUrl}");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: skewX(8deg);
    height: 100%;
    width: 100%;
    margin-left: ${({ isHomeTeam }) => (isHomeTeam ? "-9%" : "9%")};
  }
`;

const SplitLogo = (teams, datetime_local) => {
  return teams.map(team => {
    const { colors, short_name } = team;
    const { WikipediaWordMarkUrl, WikipediaLogoUrl, Key } = stubHubTeamHelper[
      short_name
    ];

    const [ColorPrimary, ColorSecondary] = colors.primary;
    const isHomeTeam = team.home_team || !team.away_team;

    return (
      <TeamLogoWrap
        isHomeTeam={isHomeTeam}
        ColorPrimary={ColorPrimary}
        ColorSecondary={ColorSecondary}
        WikipediaWordMarkUrl={WikipediaWordMarkUrl}
        WikipediaLogoUrl={WikipediaLogoUrl}
        key={`${Key} ${datetime_local}`}>
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
      target="_blank"
      rel="noopener noreferrer">
      {SplitLogo(performers, datetime_local)}
    </TicketedEventHeaderWrap>
  );
};

TicketedEventHeader.propTypes = {
  performers: PropTypes.arrayOf(PropTypes.object).isRequired,
  datetime_local: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default TicketedEventHeader;
