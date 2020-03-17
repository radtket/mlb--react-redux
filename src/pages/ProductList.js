import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductList = () => {
  const dispatch = useDispatch();

  const { productsFail, productsLoading, productsData } = useSelector(
    state => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (productsFail) {
    return <div>Error! {productsFail.message}</div>;
  }

  if (productsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ul>
      {productsData.map(({ Key, Name }) => (
        <li key={Key}>{Name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
