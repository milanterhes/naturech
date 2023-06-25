import React, { useEffect } from "react";
import { RouterInput, trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { Field, Form, FormInstance } from "houseform";
import { inferRouterInputs } from "@trpc/server";
import { z } from "zod";
import { getCookie, deleteCookie } from "cookies-next";
import decode from "jwt-decode";
import { TokenPayload, tokenPayloadSchema } from "../utils/client-jwt";

const AuthContext = React.createContext<{
  user: null | TokenPayload;
  login: (params: RouterInput["auth"]["login"]) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = React.useState<null | TokenPayload>(null);

  const { mutate } = trpc.auth.login.useMutation({
    onMutate: () => {
      console.log("logging in");
    },
    onSuccess(data) {
      console.log("success", data);
      router.push("/login-info");
    },
  });

  function logout() {
    deleteCookie("token");
    setUser(null);
  }

  function login(params: RouterInput["auth"]["login"]) {
    mutate(params);
  }

  useEffect(() => {
    const getUserFromCookie = async () => {
      const token = getCookie("token");
      console.log("token", token);
      if (!token || typeof token !== "string") {
        return;
      }

      const decoded = decode(token);

      const parsed = tokenPayloadSchema.parse(decoded);

      setUser(parsed);
    };

    getUserFromCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const router = useRouter();
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContextProvider");
  }
  return context;
};

type FormData = {
  email: string;
};

const Login = () => {
  const { login, logout, user } = useAuth();

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
