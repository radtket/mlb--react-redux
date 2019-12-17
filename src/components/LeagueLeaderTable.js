import React, { useState } from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { Link } from "react-router-dom";
import { espnLogo, teamFinder } from "../utils/helpers";

const StatTable = styled.div`
  &::before {
    background-color: ${props => `${props.PrimaryColor}`};
  }

  .wisbb--leaders__team-logo {
    background: #f2f2f2 url("${props => `${props.leaderLogo}`}");
    background-size: 85%;
    background-position: center center;
    background-repeat: no-repeat;
    transition: background-color 1s ease-out;

    &--wrap {
      &:hover {
        .wisbb--leaders__team-logo {
          background-color: ${props => `${props.SecondaryColor}`};
        }
      }
    }
  }

  table {
    tr {
      &:first-of-type {
        background-color: ${props => `${props.PrimaryColor}`};
        color: ${props =>
          `${tinycolor
            .mostReadable(`#${props.PrimaryColor}`, [`#fff`, `#000`])
            .toHexString()}`};
      }
    }
  }
`;
const statDecoders = statArg => {
  switch (statArg) {
    case "ba":
      return "avg";
    case "hits":
      return "h";
    case "rs":
      return "runs";
    case "gc":
      return "games_completed";
    case "gs":
      return "games_saved";
    case "gw":
      return "games_won";
    case "gl":
      return "games_lost";
    default:
      return statArg;
  }
};

const acronym = words => {
  if (!words) {
    return "";
  }

  if (!words.includes("_")) {
    return words;
  }

  const firstLetter = x => {
    if (x) {
      return x[0];
    }
    return "";
  };

  return words
    .split("_")
    .map(firstLetter)
    .join("");
};

const LeagueLeaderTable = ({ dataObj }) => {
  const [toggle, setToggle] = useState(true);
  return Object.entries(dataObj).map(([name, data]) => {
    const { abbr } = data[0];
    const { PrimaryColor, SecondaryColor } = teamFinder[abbr];
    const stateAbrv = statDecoders(acronym(name));

    return (
      <article key={name} className="wisbb--leaders__wrap">
        <StatTable
          className="wisbb--leaders"
          leaderLogo={espnLogo(abbr, 100)}
          PrimaryColor={`${PrimaryColor}`}
          SecondaryColor={`${SecondaryColor}`}>
          <Link
            className="wisbb--leaders__team-logo--wrap"
            to={`teams/${abbr}`}>
            <figure className="wisbb--leaders__team-logo" />
          </Link>
          <div className="wisbb--leaders__list">
            <span className="wisbb--leaders__list--title">
              {name.replace(/_/g, " ")}
            </span>
            <table>
              <tbody>
                {data.map((stat, i) => {
                  const {
                    name: TeamName,
                    // market: TeamCity,
                    abbr: TeamKey,
                    rank,
                    id,
                  } = stat;
                  const statValue = stat[stateAbrv];

                  return (
                    <tr
                      key={id}
                      style={
                        i > 9 && toggle
                          ? { display: "none" }
                          : { display: "table-row" }
                      }>
                      <td>
                        <span className="wisbb--leaders__rank">{rank}</span>
                      </td>
                      <td>
                        <span className="wisbb--leaders__team-name">
                          <Link to={`teams/${TeamKey}`}>{TeamName}</Link>
                        </span>
                      </td>
                      <td>
                        <span>{statValue}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="text-center">
              {data.length > 9 && (
                <button
                  className="button"
                  onClick={() => setToggle(!toggle)}
                  type="button">
                  View {toggle ? "More" : "Less"}
                </button>
              )}
            </div>
          </div>
        </StatTable>
      </article>
    );
  });
};

export default LeagueLeaderTable;
