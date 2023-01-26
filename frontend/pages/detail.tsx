import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../components/Loader";
import useFetchData from "../hooks/useFetchData";

type Props = {};

const detail = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { productId, fetchDataById, sellerProfile, getSellerById, loading } =
    useFetchData();

  useEffect(() => {
    if (typeof id === "string") {
      fetchDataById(id);
    }
  }, []);

  useEffect(() => {
    if (productId?.id) {
      getSellerById(productId?.seller_id);
    }
  }, [productId]);

  // console.log(sellerProfile);
  // console.log(id);
  const defaultavatar =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Favatar-default&psig=AOvVaw2No14Rfz_IrUsPSCkrbHqx&ust=1674811090239000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOj8y9Lz5PwCFQAAAAAdAAAAABAE";
  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <Loader color="#bcc" />
      ) : (
        <div className="bg-gray-300 p-10 rounded-lg shadow-md">
          <h1 className="text-xl font-bold">{productId?.brand}</h1>
          <div className="mt-4 mb-10">
            <p className="text-gray-600">{productId?.amount}</p>
            <div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
              <div className="bg-pink-400 w-3/4 h-full rounded-lg shadow-md" />
            </div>
          </div>
          <h3 className="text-xs uppercase">{productId?.name}</h3>
          <div>
            <h4 className="text-lg">
              Seller :
              <span className="text-xl capitalize font-semibold">
                {sellerProfile?.user || "anynomous"}
              </span>
            </h4>
            <img
              className="w-12 h-12"
              src={sellerProfile?.avatar || defaultavatar}
              alt="avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default detail;
