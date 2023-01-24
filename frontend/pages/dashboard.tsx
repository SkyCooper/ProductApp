import React, { useEffect } from "react";
import Product from "../components/Product";
import useFetchData from "../hooks/useFetchData";

type Props = {};

const dashboard = (props: Props) => {
  const { products, loading, fetchAllData } = useFetchData();

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};

export default dashboard;
