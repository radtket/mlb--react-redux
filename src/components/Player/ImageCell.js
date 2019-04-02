import React from "react";
import { PropTypes } from "prop-types";
import { Table } from "rsuite";
import { espnLogo } from "../../utils/helpers";

const ImageCell = ({ rowData, dataKey, ...props }) => {
  const { league_level: leagueLevel, team } = rowData;

  if (leagueLevel === "MAJ") {
    return (
      <Table.Cell
        {...props}
        style={{
          backgroundImage: `${
            team.includes("/")
              ? `url(${espnLogo(team.split("/")[0])}), url(${espnLogo(
                  team.split("/")[1]
                )})`
              : `url(${espnLogo(team, 50)}`
          }`,
          backgroundRepeat: "no-repeat",
          backgroundSize: team.includes("/") ? "25px" : "50%",
          backgroundPosition: team.includes("/")
            ? `5px 5px, 30px 15px, right top`
            : "center",
          padding: team.includes("/") && "10px",
        }}
      />
    );
  }

  return (
    <Table.Cell {...props} dataKey={dataKey}>
      {team}
    </Table.Cell>
  );
};

ImageCell.propTypes = {
  dataKey: PropTypes.string.isRequired,
  rowData: PropTypes.shape({
    leagueLevel: PropTypes.string,
    team: PropTypes.string,
  }),
};

ImageCell.defaultProps = {
  rowData: {},
};

export default ImageCell;
