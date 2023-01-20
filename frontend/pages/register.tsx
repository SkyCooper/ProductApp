//* tsrafce --> kısayolu

import Head from "next/head";
import React, { useState } from "react";
//* yarn add react-hook-form, ile kurulumu yapıp import ettik,
//* onSubmit'in tipini import ettik
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { RegisterType } from "../types";

type Props = {};

const register = (props: Props) => {
  const { registerFunc, errorsMessage } = useAuth();
  console.log(errorsMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    await registerFunc(data);
  };

  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <form
          className="flex flex-col p-6 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errorsMessage?.username?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errorsMessage?.email?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <input
            type="text"
            placeholder="First Name"
            {...register("first_name")}
          />
          <input
            type="text"
            placeholder="Last Name "
            {...register("last_name")}
          />
          <input
            type="text"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errorsMessage?.password?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <input
            type="text"
            placeholder="Password Again"
            {...register("password2", { required: true })}
          />
          {errorsMessage?.password2?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default register;
