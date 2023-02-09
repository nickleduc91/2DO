import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";

const ProfileForm = ({ user, boards }: any) => {
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
  const [showPassword, setShowPassword] = useState(false);

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
  const getTotalTasks = () => {
    let total = 0;
    boards.map((board: any) => {
      total += board.tasks.length;
    });
    return total;
  };

  const getTotalTasksStatus = () => {
    let totalCompleted = 0;
    let totalUncompleted = 0;
    boards.map((board: any) => {
      board.tasks.map((task: any) => {
        if (task.completed) {
          totalCompleted++;
        } else {
          totalUncompleted++;
        }
      });
    });
    return { completed: totalCompleted, uncompleted: totalUncompleted };
  };

  return (
    <div className="flex justify-center mx-auto w-full max-w-5xl bg-black pt-12 pb-12 grid grid-cols-2 text-white">
      <div className="ml-12">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field: any, index: number) => (
            <div key={index}>
              <p className="font-semibold text-xl text-cyan-500">
                {field.header}
                {field.header == "Password" && (
                  <button
                    type="submit"
                    className="w-16 ml-6 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-cyan-500 px-2 py-0.5 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
                    disabled={disable}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </p>
              <input
                type={
                  field.header == "Password" && showPassword == false
                    ? "password"
                    : "text"
                }
                {...register(field.register)}
                className="w-64 placeholder-white mb-12 text-white bg-black border-b-2 ml-4 form-control block w-full px-4 py-2 text-lg bg-clip-padding transition ease-in-out m-0 focus:bg-black focus:border-cyan-500 focus:outline-none"
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
      <div className="ml-24">
        <section className="mb-32 text-gray-800 text-center">
          <div className="pt-24 grid lg:gap-x-20 md:grid-cols-2">
            <div className="mb-12 md:mb-0">
              <div className="p-4 bg-cyan-500 rounded-md shadow-lg inline-block mb-6">
                <i className="ri-artboard-line text-white ri-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                {boards.length}
              </h3>
              <h5 className="text-lg font-medium text-white">Total Boards</h5>
            </div>

            <div className="mb-12 md:mb-0">
              <div className="p-4 bg-cyan-500 rounded-md shadow-lg inline-block mb-6">
                <i className="ri-task-line text-white ri-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                {getTotalTasks()}
              </h3>
              <h5 className="text-lg font-medium text-white">Total Tasks</h5>
            </div>

            <div className="mt-12 mb-12 md:mb-0">
              <div className="p-4 bg-cyan-500 rounded-md shadow-lg inline-block mb-6">
                <i className="ri-task-fill text-white ri-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                {getTotalTasksStatus().completed}
              </h3>
              <h5 className="text-lg font-medium text-white">
                Tasks Completed
              </h5>
            </div>
            <div className="mt-12 mb-12 md:mb-0">
              <div className="p-4 bg-cyan-500 rounded-md shadow-lg inline-block mb-6">
                <i className="ri-edit-box-line text-white ri-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                {getTotalTasksStatus().uncompleted}
              </h3>
              <h5 className="text-lg font-medium text-white">
                Tasks Incompleted
              </h5>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileForm;
