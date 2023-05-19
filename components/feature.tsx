const features = [
  {
    name: "Saves your time",
    description:
      "Between working at the office, attending meetings, doing chores, and going to appointments, try to make time for the activities you enjoy. A to-do list can help you organize your time and finish your tasks more efficiently, giving you more free time.",
    icon: "ri-time-line ri-3x text-cyan-500",
  },
  {
    name: "Boost productivity",
    description:
      "If you record all your tasks in a to-do list, you can easily review the list and prioritize the most important tasks. Why waste time on trivial activities when there are important matters that need your attention?",
    icon: "ri-line-chart-line ri-3x text-cyan-500",
  },
  {
    name: "Reduces anxiety",
    description:
      "Being able to reduce anxiety is an important part of a balanced life. Organizing your schedule with a to-do list can improve your mental health by resolving uncertainty and allowing you to see all the activities you plan to accomplish throughout the day.",
    icon: "ri-star-smile-line ri-3x text-cyan-500",
  },
  {
    name: "Increases motivation",
    description:
      "Too many tasks to remember can be overwhelming, but with the proper motivation, you can accomplish more and reduce stress. Physically crossing off tasks provides a sense of accomplishment and will only motivate you even more",
    icon: "ri-add-circle-line ri-3x text-cyan-500",
  },
];

const Feature = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 py-20 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
            How does <span className="text-cyan-500">TwoDue</span> benefit you?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Being able to organize and keep track of your busy day is so
            important. Below are just a few ways TwoDue can satisfy that!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg">
                    <i className={`${feature.icon} ri-3x text-cyan-500`}></i>
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Feature;
