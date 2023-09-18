import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const ProfileForm = ({ user, boards }: any) => {
  const { register, handleSubmit } = useForm();
  const { data: session, update } = useSession();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
    console.log(user.firstName);
  };

  const handleLastNameChange = (event: any) => {
    setlastName(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const onSubmit = async () => {
    await axios({
      method: "post",
      url: "/api/users/saveProfile",
      data: {
        username,
        firstName,
        lastName,
        userId: user._id,
      },
    });
    updateSession();
  };

  const updateSession = async () => {
    await update({
      user: {
        firstName: firstName,
        lastName: lastName,
        username: username,
      },
    });
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
    <div className="justify-center mx-auto w-full max-w-5xl pt-12 pb-12 grid grid-cols-2 text-black dark:text-white">
      <div className="mt-20">
        <form className="flex flex-col" >
          <div>
            <p className="font-semibold text-xl text-cyan-500">Username</p>
            <input
              {...register("username")}
              className="hover:border-cyan-500 font-medium bg-transparent w-64 placeholder-black dark:placeholder-white mb-12 text-black dark:text-white border-b-2 border-black dark:border-white ml-4 form-control block px-4 py-2 text-xl bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none"
              defaultValue={user.username}
              onChange={handleUsernameChange}
            />
            <p className="font-semibold text-xl text-cyan-500">First Name</p>
            <input
              {...register("firstName")}
              className="hover:border-cyan-500 font-medium bg-transparent w-64 placeholder-black dark:placeholder-white mb-12 text-black dark:text-white border-b-2 border-black dark:border-white ml-4 form-control block px-4 py-2 text-xl bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none"
              defaultValue={user.firstName}
              onChange={handleFirstNameChange}
            />
            <p className="font-semibold text-xl text-cyan-500">Last Name</p>
            <input
              {...register("lastName")}
              className="hover:border-cyan-500 font-medium bg-transparent w-64 placeholder-black dark:placeholder-white mb-12 text-black dark:text-white border-b-2 border-black dark:border-white ml-4 form-control block px-4 py-2 text-xl bg-clip-padding transition ease-in-out m-0 focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none"
              defaultValue={user.lastName}
              onChange={handleLastNameChange}
            />
          </div>

          {/* {firstName != user.firstName ||
          lastName != user.lastName ||
          username != user.username ? (
            <button
              type="submit"
              className="-mt-3 w-1/2 ml-4 flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
              onClick={onSubmit}
            >
              Update Profile
            </button>
          ) : (
            <button
              type="submit"
              className="-mt-3 w-1/2 ml-4 flex items-center justify-center  rounded-md border border-transparent bg-cyan-800 px-4 py-2 text-base font-medium text-white shadow-sm"
              disabled={true}
            >
              Update Profile
            </button>
          )} */}
        </form>
      </div>

      <div className="ml-24">
        <section className="mb-32 text-center">
          <div className="pt-24 grid lg:gap-x-20 md:grid-cols-2">
            <div className="mb-12 md:mb-0">
              <div className="p-4 bg-cyan-500 rounded-md shadow-lg inline-block mb-6">
                <i className="ri-artboard-line text-white ri-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                {boards.length}
              </h3>
              <h5 className="text-lg font-medium text-black dark:text-white">
                Total Boards
              </h5>
            </div>

            <div className="mb-12 md:mb-0">
              <div className="p-4 bg-cyan-500 rounded-md shadow-lg inline-block mb-6">
                <i className="ri-task-line text-white ri-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                {getTotalTasks()}
              </h3>
              <h5 className="text-lg font-medium text-black dark:text-white">
                Total Tasks
              </h5>
            </div>

            <div className="mt-12 mb-12 md:mb-0">
              <div className="p-4 bg-cyan-500 rounded-md shadow-lg inline-block mb-6">
                <i className="ri-task-fill text-white ri-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">
                {getTotalTasksStatus().completed}
              </h3>
              <h5 className="text-lg font-medium text-black dark:text-white">
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
              <h5 className="text-lg font-medium text-black dark:text-white">
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
