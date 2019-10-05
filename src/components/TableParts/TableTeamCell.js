import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { espnLogo } from "../../utils/helpers";

const TableTeamCellWrap = styled.td`
  a {
    color: inherit;

    &:hover {
      text-decoration: underline;
    }

    > * {
      vertical-align: middle;
    }

    img {
      height: 24px;
      width: 24px;
      margin-right: 6px;
    }

    .standings__team {
      &--arbv,
      &--city,
      &--full {
        display: inline;
      }

      &--arbv {
        @media (min-width: 400px) {
          display: none;
        }
      }

      &--full {
        @media (max-width: 399px) {
          display: none;
        }
      }

      &--city {
        @media (max-width: 767px) {
          display: none;
        }
      }
    }
  }
`;

const TableTeamCell = ({ Key: TeamAbrv, City, Name, hideCity }) => {
  return (
    <TableTeamCellWrap className="standings__team">
      <Link to={`/teams/${TeamAbrv}`}>
        <img alt={`${City} ${Name} Logo`} src={espnLogo(`${TeamAbrv}`, 36)} />
        {TeamAbrv && <abbr className="standings__team--arbv">{TeamAbrv}</abbr>}
        {City && !hideCity && (
          <figcaption className="standings__team--city">{City} </figcaption>
        )}
        {Name && (
          <figcaption className="standings__team--full">{Name}</figcaption>
        )}
      </Link>
    </TableTeamCellWrap>
  );
};

TableTeamCell.propTypes = {
  Key: PropTypes.string.isRequired,
  City: PropTypes.string,
  Name: PropTypes.string,
  hideCity: PropTypes.bool,
};

TableTeamCell.defaultProps = {
  City: null,
  Name: null,
  hideCity: false,
};

export default TableTeamCell;
