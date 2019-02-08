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
    const { productsFail, productsLoading, products } = this.props;

    if (productsFail) {
      return <div>Error! {productsFail.message}</div>;
    }

    if (productsLoading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        <li>hi</li>
        {products.map(item => (
          <li key={item.Key}>{item.Name}</li>
        ))}
      </ul>
    );
  }
}

ProductList.propTypes = {
  productsFail: null || PropTypes.bool,
  productsLoading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchProducts: PropTypes.func.isRequired
};

ProductList.defaultProps = {
  productsFail: null
};

const mapStateToProps = state => ({
  products: state.products.productsData,
  productsLoading: state.products.productsLoading,
  productsFail: state.products.productsError
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
