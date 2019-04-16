/* eslint-disable camelcase */
import React from "react";
import Card from "./Card";
import { isArrayEmpty } from "../utils/helpers";

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

const LeagueLeaderStatCat = statCat => {
  return Object.entries(statCat).reduce((all, one) => {
    const [category, leaders] = one;
    const stateAbrv = statDecoders(acronym(category));
    if (!isArrayEmpty(leaders.players)) {
      all.push(
        <Card
          key={category}
          title={category.replace(/_/g, " ")}
          body={
            <ul>
              {leaders.players.map(player => {
                const { first_name, last_name, id: playerId } = player;
                const statValue = player[stateAbrv];

                return (
                  <li key={`${playerId} ${stateAbrv}`}>
                    {`${first_name} ${last_name} ${statValue}`}
                  </li>
                );
              })}
            </ul>
          }
        />
      );
    }

    return all;
  }, []);
};

export default LeagueLeaderStatCat;
