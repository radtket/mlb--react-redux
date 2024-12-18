import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) {
    return null;
  }

  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((err, key) => (
      // eslint-disable-next-line react/no-array-index-key
      <ErrorStyles {...{ key }}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {err.message.replace("GraphQL error: ", "")}
        </p>
      </ErrorStyles>
    ));
  }

  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </ErrorStyles>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    networkError: PropTypes.shape({
      result: PropTypes.string,
    }),
    message: PropTypes.string,
  }),
};

export default ErrorMessage;
