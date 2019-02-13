export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function espnLogo(teamAbrv, size) {
  return `http://a.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/${teamAbrv.toLowerCase()}.png&h=${size}&w=${size}`;
}
