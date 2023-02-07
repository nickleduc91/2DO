import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Spinner from "../spinner";

interface IFormInput {
  username: String;
  password: String;
}

const loginForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const [pageState, setPageState] = useState({
    error: "",
    processing: false,
  });

  const simplifyError = (error: any) => {
    const errorMap: any = {
      CredentialsSignin: "Invalid username or password",
    };
    return errorMap[error] ?? "Unknown error occurred";
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setPageState((old) => ({ ...old, processing: true, error: "" }));
    await signIn("credentials", {
      redirect: false,
      password: data.password,
      username: data.username,
    })
      .then((response) => {
        if (response?.ok) {
          router.push("/boards");
        } else {
          setPageState((old) => ({
            ...old,
            processing: false,
            error: response?.error ?? "error",
          }));
        }
      })
      .catch((error) => {
        setPageState((old) => ({
          ...old,
          processing: false,
          error: error.message ?? "Error",
        }));
      });
  };
  return (
    <section className="h-screen -mb-24">
      <div className="px-6 h-full">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 -mt-20">
          <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-4/12 mb-12 md:mb-0">
            <h1 className="text-center text-cyan-500 text-5xl pb-7 font-semibold">
              Welcome Back!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  type="text"
                  {...register("username")}
                  className="text-white bg-black border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
                  placeholder="Username"
                />
              </div>
              {/* <!-- Password input --> */}
              <div className="mb-2">
                <input
                  {...register("password")}
                  type="password"
                  className="text-white bg-black border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              {pageState.error !== "" && (
                <div className="text-red-500 mb-2">
                  {simplifyError(pageState.error)}
                </div>
              )}

              <div className="pt-12 text-center lg:text-left">
                <button
                  disabled={pageState.processing}
                  type="submit"
                  className="inline-block px-7 py-3 bg-cyan-500 text-white font-medium text-sm leading-snug uppercase rounded-xl shadow-md hover:bg-cyan-600 hover:shadow-lg focus:bg-cyan-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  <div className="flex flex-row">
                    Login
                    <div className="pl-2">
                      <Spinner display={pageState.processing} bgColour='text-white' fillColour='fill-blue-600'/>
                    </div>
                  </div>
                </button>
                <p className="text-gray-400 text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?<br></br>
                  <a
                    href="/register"
                    className="text-cyan-500 hover:text-cyan-700 transition duration-200 ease-in-out"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default loginForm;
