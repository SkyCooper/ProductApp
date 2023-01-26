import Router, { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import useFetchData from "../hooks/useFetchData";
import { ProductType } from "../types";

const addproduct = () => {
  const { addProduct, loading } = useFetchData();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>();

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    await addProduct(data);
    Router.push("/dashboard");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-4 mt-28"
    >
      <input
        type="text"
        placeholder="* Name"
        className="registerInput"
        {...register("name", { required: true })}
      />
      <input
        type="text"
        placeholder="* Brand"
        className="registerInput"
        {...register("brand", { required: true })}
      />
      <input
        type="number"
        placeholder="Amount"
        className="registerInput"
        {...register("amount", { required: true })}
      />
      <input
        type="number"
        placeholder="Vote"
        className="registerInput"
        {...register("vote")}
      />
      <input
        type="number"
        placeholder="Rating"
        className="registerInput"
        {...register("rating")}
      />

      <button type="submit" className="submitButton">
        Add Product
      </button>
    </form>
  );
};

export default addproduct;
