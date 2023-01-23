import React, { useState } from "react";
import { ErrorType, RegisterType } from "../types";
import axios from "axios";
import { REGISTER_URL } from "../constant/urls";
import { useRouter } from "next/router";

const useAuth = () => {
  const [errorsMessage, setErrorsMessage] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const registerFunc = async (registerInfo: RegisterType) => {
    setLoading(true);
    try {
      const { data } = await axios.post(REGISTER_URL, registerInfo);
      setErrorsMessage(null);
      sessionStorage.setItem("user", JSON.stringify(data));
      router.push("/");
      // console.log(data);
    } catch (error: any) {
      setErrorsMessage(error.response.data);
      // console.log(error);
    }
    setLoading(false);
  };

  return { errorsMessage, registerFunc, loading };
};

export default useAuth;
