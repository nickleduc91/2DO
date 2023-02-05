import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

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
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <h1 className="text-center text-cyan-500 text-5xl pb-5 font-semibold">
              Welcome back!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  type="text"
                  {...register("username")}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Username"
                />
              </div>
              {/* <!-- Password input --> */}
              <div className="mb-2">
                <input
                  {...register("password")}
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              {pageState.error !== "" && (
                <div className="text-red-500 mb-2">
                  {simplifyError(pageState.error)}
                </div>
              )}
              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-cyan-500 checked:border-cyan-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck2"
                  />
                  <label className="form-check-label inline-block text-gray-800">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-gray-800">
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left">
                <button
                  disabled={pageState.processing}
                  type="submit"
                  className="inline-block px-7 py-3 bg-cyan-500 text-white font-medium text-sm leading-snug uppercase rounded-xl shadow-md hover:bg-cyan-600 hover:shadow-lg focus:bg-cyan-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
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
