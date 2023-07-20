import { deleteCookie, getCookie } from "cookies-next";
import { Field, Form, FormInstance } from "houseform";
import decode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { z } from "zod";
import { TokenPayload, tokenPayloadSchema } from "../utils/client-jwt";
import { RouterInput, trpc } from "../utils/trpc";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
  const t = useTranslations();
  const { login } = useAuth();

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
        <div className="flex flex-col gap-1 items-center">
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
          </Field>{" "}
          <button
            className="bg-main-theme text-white group mt-5 flex transform rounded-md bg-[#E7B181] px-2 py-1 transition-transform duration-500 ease-in-out hover:scale-105"
            aria-label="Login Now"
          >
            {t("home.hamburger.loginbutton")}
            <Image
              src={"/HeroButtonArrow.svg"}
              alt="Booking Arrow CTA"
              width={12}
              height={12}
              className="ml-2 transform self-center transition-transform duration-500 ease-in-out group-hover:translate-x-1"
            />
          </button>
        </div>
      )}
    </Form>
  );
};

export default Login;
