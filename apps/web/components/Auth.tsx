import React from "react";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const {
    data,
    status,
    mutate: login,
  } = trpc.auth.login.useMutation({
    onMutate: () => {
      console.log("logging in");
    },
    onSuccess(data) {
      console.log("success", data);
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    const email = (data as FormData).email;
    login({ email });
  });

  console.log(data, status);

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="email@example.com"
        {...register("email", { required: true })}
        required
      />

      {errors.email && <span>This field is required</span>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
