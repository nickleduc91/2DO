import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";

const ProfileForm = ({ user }: any) => {
  const { register, handleSubmit } = useForm();
  const [fields, setFields] = useState([
    { placeholder: user.username, register: "username", header: "Username" },
    { placeholder: user.password, register: "password", header: "Password" },
    {
      placeholder: user.profile.firstName,
      register: "firstName",
      header: "First Name",
    },
    {
      placeholder: user.profile.lastName,
      register: "lastName",
      header: "Last Name",
    },
  ]);
  const [disable, setDisable] = useState(false);

  const onSubmit = async ({ username, password, firstName, lastName }: any) => {
    if (!username && !password && !firstName && !lastName) {
      return;
    }
    await axios({
      method: "post",
      url: "/api/users/saveProfile",
      data: {
        username,
        password,
        firstName,
        lastName,
        userId: user._id,
      },
    });
    if (username) {
      fields[0].placeholder = username;
    }
    if (password) {
      fields[1].placeholder = password;
    }
    if (firstName) {
      fields[2].placeholder = firstName;
    }
    if (lastName) {
      fields[3].placeholder = lastName;
    }
    setFields(fields);
  };

  return (
    <div className="flex justify-center mx-auto w-full max-w-5xl bg-white pt-12 pb-12">
      <div>
        <h3 className="text-4xl mb-12 font-semibold">Account Settings</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field: any, index: number) => (
            <div key={index}>
              <p className="font-semibold text-xl text-cyan-500">
                {field.header}
              </p>
              <input
                type="text"
                {...register(field.register)}
                className="placeholder-black mb-12 border-b-2 ml-4 form-control block w-60 px-4 py-2 text-lg bg-white bg-clip-padding transition ease-in-out m-0 focus:bg-white focus:border-cyan-500 focus:outline-none"
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-24 ml-20 cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
            disabled={disable}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
