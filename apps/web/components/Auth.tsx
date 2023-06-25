import React from "react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { Field, Form, FormInstance } from "houseform";
import { z } from "zod";

type FormData = {
  email: string;
};

const Login = () => {
  const router = useRouter();

  const { mutate: login } = trpc.auth.login.useMutation({
    onMutate: () => {
      console.log("logging in");
    },
    onSuccess(data) {
      console.log("success", data);
      router.push("/login-info");
    },
  });

  const submitHandler: (
    values: FormData,
    form: FormInstance<FormData>
  ) => void = (data) => {
    const email = data.email;
    login({ email });
  };

  return (
    <Form<FormData> onSubmit={submitHandler}>
      {({ submit }) => (
        <div className="flex flex-col gap-1">
          <Field
            name="email"
            onChangeValidate={z
              .string()
              .email("Not a valid email address")
              .nonempty("Email is required")}
          >
            {({ value, setValue, onBlur, errors }) => (
              <>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                  required
                  className={`border ${
                    errors.length > 0 ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2 focus:outline-none`}
                />
              </>
            )}
          </Field>
          <button type="submit" className="btn" onClick={submit}>
            Login
          </button>
        </div>
      )}
    </Form>
  );
};

export default Login;
