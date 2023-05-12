const Feature = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="fill-cyan-500 absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">How</span>
          </span>{" "}
          does <span className="text-cyan-500">TwoDue</span> benefit you?
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-200 md:text-lg">
          Being able to organize and keep track of your busy day is so
          important. Below are just a few ways TwoDue can satisfy that!
        </p>
      </div>
      <div className="grid gap-8 row-gap-10 lg:grid-cols-2 dark:text-white">
        <div className="max-w-md sm:mx-auto sm:text-center">
          <i className="ri-time-line ri-3x text-cyan-500"></i>
          <h6 className="mb-3 text-xl font-bold leading-5">Saves your time</h6>
          <p className="mb-3 text-sm text-black bg-white dark:bg-slate-800 rounded-3xl py-6 px-6 shadow-xl dark:text-gray-200">
            Between working at the office, attending meetings, doing chores, and
            going to appointments, try to make time for the activities you
            enjoy. A to-do list can help you organize your time and finish your
            tasks more efficiently, giving you more free time.
          </p>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <i className="ri-line-chart-line ri-3x text-cyan-500"></i>
          <h6 className="mb-3 text-xl font-bold leading-5">Productivity</h6>
          <p className="mb-3 text-sm text-black bg-white dark:bg-slate-800 rounded-3xl py-6 px-6 shadow-xl dark:text-gray-200">
            If you record all your tasks in a to-do list, you can easily review
            the list and prioritize the most important tasks. Why waste time on
            trivial activities when there are important matters that need your
            attention?
          </p>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <i className="ri-star-smile-line ri-3x text-cyan-500"></i>
          <h6 className="mb-3 text-xl font-bold leading-5">Reduces Anxiety</h6>
          <p className="mb-3 text-sm text-black bg-white dark:bg-slate-800 rounded-3xl py-6 px-6 shadow-xl dark:text-gray-200">
            Being able to reduce anxiety is an important part of a balanced
            life. Organizing your schedule with a to-do list can improve your
            mental health by resolving uncertainty and allowing you to see all
            the activities you plan to accomplish throughout the day.
          </p>
        </div>
        <div className="max-w-md sm:mx-auto sm:text-center">
          <i className="ri-add-circle-line ri-3x text-cyan-500"></i>
          <h6 className="mb-3 text-xl font-bold leading-5">Motivation</h6>
          <p className="mb-3 text-sm text-black bg-white dark:bg-slate-800 rounded-3xl py-6 px-6 shadow-xl dark:text-gray-200">
            Too many tasks to remember can be overwhelming, but with the proper
            motivation, you can accomplish more and reduce stress. Physically
            crossing off tasks provides a sense of accomplishment and will only
            motivate you even more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
