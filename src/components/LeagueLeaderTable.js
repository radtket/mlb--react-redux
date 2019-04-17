import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { Link } from "react-router-dom";
import { espnLogo, teamFinder } from "../utils/helpers";

const StatTable = styled.div`
  margin-bottom: 24px;
  display: inline-block;
	position: relative;
  width: 412px;


  &::before {
    background-color: ${props => `${props.PrimaryColor}`};
    content: "";
    height: 26px;
    left: 90px;
    position: absolute;
    top: 40px;
    width: 20px;
    z-index: 10;
  }

  .wisbb_leaders__list {
    display: inline-block;
    margin-right: 30px;
    vertical-align: top;
    width: 275px;

    &:after {
			border-left: 10px solid transparent;
			border-top: 10px solid #767573;
			content: "";
			height: 1px;
			left: 90px;
			position: absolute;
			top: 66px;
			width: 1px;
    }

    &--title {
			display: block;
			font-size: 16px;
			padding: 5px 0 14px 10px;
			text-transform: capitalize;
		}

}

    .wisbb_leaders__team-logo--wrap {
      &:hover {
        .wisbb_leaders__team-logo {
          background-color: ${props => `${props.SecondaryColor}`};
        }
      }
    }

  .wisbb_leaders__team-logo {
    height: 100px;
    width: 100px;
    border: 1px solid #c1c1c1;
    display: inline-block;
    background: #f2f2f2 url("${props => `${props.leaderLogo}`}");
    background-size: 85%;
    background-position: center center;
    background-repeat: no-repeat;
    transition: background-color 1s ease-out;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    max-width: none;
    width: 275px;

    tr {
      &:first-of-type {
        background-color: ${props => `${props.PrimaryColor}`};
        color: ${props =>
          `${tinycolor
            .mostReadable(`#${props.PrimaryColor}`, [`#fff`, `#000`])
            .toHexString()}`};
        height: 26px;
        width: 307px;
      }

      td {
        vertical-align: middle;
        &:first-child {
          padding-left: 5px;
        }
      }
      span {
        font-size: 12px;
      }
    }
    .wisbb_leaderRank {
      display: inline-block;
      font-size: 10px;
      min-width: 14px;
      padding-left: 5px;
    }

    .wisbb_teamName {
      a {
        font-weight: 500;
        color: inherit;
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
  return Object.entries(dataObj).map(item => {
    const [name, data] = item;
    const { abbr } = data[0];
    const { PrimaryColor, SecondaryColor } = teamFinder[abbr];
    const stateAbrv = statDecoders(acronym(name));

    return (
      <article key={name} className="col-sm-4">
        <StatTable
          PrimaryColor={`${PrimaryColor}`}
          SecondaryColor={`${SecondaryColor}`}
          leaderLogo={espnLogo(abbr, 100)}
          className="wisbb_leaders">
          <Link to={`teams/${abbr}`} className="wisbb_leaders__team-logo--wrap">
            <figure className="wisbb_leaders__team-logo" />
          </Link>
          <div className="wisbb_leaders__list">
            <span className="wisbb_leaders__list--title">
              {name.replace(/_/g, " ")}
            </span>
            <table>
              <tbody>
                {data.map(stat => {
                  const {
                    name: TeamName,
                    // market: TeamCity,
                    abbr: TeamKey,
                    rank,
                    id,
                  } = stat;
                  const statValue = stat[stateAbrv];

                  return (
                    <tr key={id}>
                      <td>
                        <span className="wisbb_leaderRank">{rank}</span>
                      </td>
                      <td>
                        <span className="wisbb_teamName">
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
          </div>
        </StatTable>
      </article>
    );
  });
};

export default LeagueLeaderTable;
