import axios from "axios";
import { useState } from "react";
import {
  PRODUCTS_URL,
  PRODUCT_BY_ID_URL,
  SELLER_PROFILE_URL,
} from "../constant/urls";
import { ProductType, SellerProfileType } from "../types";

const useFetchData = () => {
  const [products, setProducts] = useState<ProductType[] | []>([]);
  const [productId, setProductId] = useState<ProductType>();
  const [sellerProfile, setSellerProfile] = useState<SellerProfileType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(PRODUCTS_URL);
      setProducts(data);
      // console.log(data);
    } catch (error) {}
    setLoading(false);
  };

  const fetchDataById = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${PRODUCT_BY_ID_URL}/${id}`);
      setProductId(data);
      // console.log(data);
    } catch (error) {}
    setLoading(false);
  };

  const getSellerById = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${SELLER_PROFILE_URL}/${id}`);
      setSellerProfile(data);
      // console.log(data);
    } catch (error) {}
    setLoading(false);
  };

  const addProduct = async (productInfo: ProductType) => {
    setLoading(true);
    try {
      await axios.post(PRODUCTS_URL, productInfo);
    } catch (error) {}
    setLoading(false);
  };

  return {
    loading,
    products,
    productId,
    sellerProfile,
    fetchAllData,
    fetchDataById,
    getSellerById,
    addProduct,
  };
};

export default useFetchData;
