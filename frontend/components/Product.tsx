import { useRouter } from "next/router";
import React from "react";
import { ProductType } from "../types";

type Props = {
  item: ProductType;
};

const Product = ({ item }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: "/detail",
      query: { id: item.id },
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-300 p-10 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">{item.brand}</h1>
        <div className="mt-4 mb-10">
          <p className="text-gray-600">{item.amount}</p>
          <div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
            <div className="bg-pink-400 w-3/4 h-full rounded-lg shadow-md" />
          </div>
        </div>
        <h3 className="text-xs uppercase">{item.name}</h3>
        <button
          className="bg-orange-400 py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75"
          onClick={handleClick}
        >
          Detail Product
        </button>
      </div>
    </div>
  );
};

export default Product;
