import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../../modules/product/actions";

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { error, loading, products } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        <li>hi</li>
        {products.map(product => (
          <li key={product.Key}>{product.Name}</li>
        ))}
      </ul>
    );
  }
}

ProductList.propTypes = {
  error: null || PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchProducts: PropTypes.func.isRequired
};

ProductList.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  products: state.products.productData,
  loading: state.products.loading,
  error: state.products.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(ProductList);
