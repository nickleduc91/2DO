import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "../spinner";

interface IFormInput {
  firstName: String;
  username: String;
  password: String;
  lastName: String;
}

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const [pageState, setPageState] = useState({
    error: "",
    processing: false,
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!data.username || !data.password || !data.firstName || !data.lastName) {
      setPageState((old) => ({
        ...old,
        processing: false,
        error: "Please fill out all fields",
      }));
      return;
    }
    setPageState((old) => ({ ...old, processing: true, error: "" }));
    const credentials = {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    signIn("credentials", {
      ...credentials,
      register: true,
      redirect: false,
    }).then((response) => {
      if (response?.ok) {
        router.push("/boards");
      } else {
        setPageState((old) => ({
          ...old,
          processing: false,
          error: response?.error ?? "error",
        }));
      }
    });
  };

  return (
    <section className="h-screen -mb-24">
      <div className="px-6 h-full">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 -mt-20">
          <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-4/12 mb-12 md:mb-0">
            <h1 className="text-center text-cyan-500 text-5xl pb-7 font-semibold">
              Start Your Journey!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 grid grid-cols-2 gap-7">
                <input
                  {...register("firstName")}
                  className="text-white bg-black border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
                  placeholder="First Name"
                />
                <input
                  {...register("lastName")}
                  className="text-white bg-black border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
                  placeholder="Last Name"
                />
              </div>

              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  {...register("username")}
                  className="text-white bg-black border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
                  placeholder="Username"
                />
              </div>

              {/* <!-- Password input --> */}
              <div className="mb-6">
                <input
                  {...register("password")}
                  type="password"
                  className="text-white bg-black border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              {pageState.error && (
                <div className="text-red-500 mb-2">
                  {pageState.error == "CredentialsSignin"
                    ? "Username is already taken"
                    : pageState.error}
                </div>
              )}
              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-cyan-500 text-white font-medium text-sm leading-snug uppercase rounded-xl shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  <div className="flex flex-row">
                    Create Account
                    <div className="pl-2">
                      <Spinner display={pageState.processing} bgColour='text-white' fillColour='fill-cyan-700' />
                    </div>
                  </div>
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-gray-400">
                  Have an account?<br></br>
                  <a
                    href="/login"
                    className="text-cyan-500 hover:text-cyan-700 transition duration-200 ease-in-out"
                  >
                    Login
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

export default RegisterForm;
