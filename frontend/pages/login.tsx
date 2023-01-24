import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { LoginType } from "../types";
import { motion } from "framer-motion";
import Head from "next/head";
import Loader from "../components/Loader";

type Props = {};

const login = (props: Props) => {
  const { loginFunc, errorsMessage, loading } = useAuth();
  console.log(errorsMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    await loginFunc(data);
  };
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="flex justify-center items-center h-screen"
      >
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputDiv">
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              {...register("username", { required: true })}
            />
          </div>

          <div className="inputDiv">
            <input
              type="text"
              placeholder="Password"
              className="registerInput"
              {...register("password", { required: true })}
            />

            {errorsMessage?.non_field_errors && (
              <p className="errorMessage">
                * {errorsMessage?.non_field_errors[0]}
              </p>
            )}
          </div>

          <button type="submit" className="submitButton">
            {loading ? <Loader color="#bcc" /> : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default login;
