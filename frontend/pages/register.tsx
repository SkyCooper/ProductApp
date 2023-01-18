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
  const { registerFunc } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
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
          {errors.username && <span>This field is required</span>}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
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
          {errors.password && <span>This field is required</span>}
          <input
            type="text"
            placeholder="Password Again"
            {...register("password2", { required: true })}
          />
          {errors.password2 && <span>This field is required</span>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default register;
