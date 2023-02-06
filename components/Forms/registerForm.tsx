import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface IFormInput {
  firstName: String;
  username: String;
  password: String;
  lastName: String;
}

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!data.username || !data.password || !data.firstName || !data.lastName) {
      setError("Please complete all fields");
      return;
    }
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
        setError("");
        router.push("/boards");
      } else {
        setError(response?.error ?? "error");
      }
    });
  };

  return (
    <section className="h-screen -mb-24">
      <div className="px-6 h-full">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 -mt-20">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <h1 className="text-center text-cyan-500 text-5xl pb-5 font-semibold">
              Start your journey!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 grid grid-cols-2 gap-7">
                <input
                  {...register("firstName")}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-500 focus:outline-none"
                  placeholder="First Name"
                />
                <input
                  {...register("lastName")}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Last Name"
                />
              </div>

              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  {...register("username")}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Username"
                />
              </div>

              {/* <!-- Password input --> */}
              <div className="mb-6">
                <input
                  {...register("password")}
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-500 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              {error && (
                <div className="text-red-500 mb-2">
                  {error == "CredentialsSignin"
                    ? "Username is already taken"
                    : error}
                </div>
              )}
              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-cyan-500 text-white font-medium text-sm leading-snug uppercase rounded-xl shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Create Account
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
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
