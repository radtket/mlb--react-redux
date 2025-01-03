import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const ProductList = () => {
  const dispatch = useDispatch();

  const { productsError, productsLoading, productsData } = useSelector(
    state => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (productsError) {
    return <ErrorMessage error={productsError} />;
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
