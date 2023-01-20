import React, { useState } from "react";
import { ErrorType, RegisterType } from "../types";
import axios from "axios";
import { REGISTER_URL } from "../constant/urls";

const useAuth = () => {
  const [errorsMessage, setErrorsMessage] = useState<ErrorType>();
  const registerFunc = async (registerInfo: RegisterType) => {
    try {
      const { data } = await axios.post(REGISTER_URL, registerInfo);
      // console.log(data);
    } catch (error: any) {
      setErrorsMessage(error.response.data);
      console.log(error);
    }
  };

  return { errorsMessage, registerFunc };
};

export default useAuth;
