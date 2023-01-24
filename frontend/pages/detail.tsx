import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useFetchData from "../hooks/useFetchData";

type Props = {};

const detail = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { productId, fetchDataById } = useFetchData();

  useEffect(() => {
    if (typeof id === "string") {
      fetchDataById(id);
    }
  }, []);

  console.log(productId);

  return <div>detail</div>;
};

export default detail;
