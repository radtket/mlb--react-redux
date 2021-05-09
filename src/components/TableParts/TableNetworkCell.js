import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { networkDecoder } from "../../utils/networks";

const NetworkCell = styled.td`
  text-align: center;

  img,
  svg {
    display: block;
    height: 24px;
    margin: auto;
    max-width: 72px;
  }
`;

const TableNetworkCell = ({ network }) => {
  return (
    <NetworkCell className="text-center">{networkDecoder(network)}</NetworkCell>
  );
};

TableNetworkCell.propTypes = {
  network: PropTypes.string,
};

TableNetworkCell.defaultProps = {
  network: "",
};

export default TableNetworkCell;
