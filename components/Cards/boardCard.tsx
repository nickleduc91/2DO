function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardCard = ({ board, handleRemoveBoard }: any) => {
  const getCompletedCount = (board: any) => {
    let completed = 0;
    board.tasks.map((task: any) => {
      if (task.completed) {
        completed++;
      }
    });
    return completed;
  };

  const getPercentage = (board: any) => {
    if (getCompletedCount(board) == 0) {
      return 0;
    }
    return (getCompletedCount(board) / board.tasks.length) * 100;
  };
  console.log(board.tasks.length, getCompletedCount(board));
  return (
    <div className="mx-auto w-full max-w-md py-4 px-4 justify-center items-center animate-wiggle">
      <div className="col-span-2 h-52 flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-800 shadow-xl mb-6 py-5 px-4">
        <div className="">
          <div className="flex flex-row relative">
            <h4 className="truncate text-cyan-500 text-2xl font-medium leading-tight mb-5">
              {board.name}
            </h4>
            <i
              className="ri-delete-bin-2-line ri-xl ml-28 hover:text-cyan-500 dark:hover:text-cyan-500 absolute top-0 right-0 text-black dark:text-white"
              onClick={() => handleRemoveBoard(board)}
            ></i>
          </div>
          <p className="text-gray-300 dark:text-white text-md">
            {board.description}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-800">
            <div className="mt-2 shadow-slate-200 rounded-lg  w-1/3">
              <div className="pr-1 flex items-center justify-between">
                <span className="text-slate-400 dark:text-white text-sm text-slate-500">
                  Completion
                </span>
                <span
                  className={classNames(
                    getCompletedCount(board) == board.tasks.length
                      ? "bg-teal-50 dark:bg-slate-700 text-teal-400"
                      : "bg-cyan-50 dark:bg-slate-700 text-cyan-500",
                    "px-2 py-1 rounded-lg text-xs font-medium min-w-[46px] text-center"
                  )}
                >
                  {Math.ceil(getPercentage(board))}%
                </span>
              </div>

              <div className="ml-3 w-24 bg-slate-200 dark:bg-slate-700 h-1 mb-6 mt-2">
                <div
                  className={classNames(
                    getCompletedCount(board) == board.tasks.length
                      ? "bg-teal-400"
                      : "bg-cyan-400",
                    "h-1 rounded-full"
                  )}
                  style={{ width: getPercentage(board) }}
                ></div>
              </div>
            </div>

            <a
              href={`/boards/${board._id}`}
              type="button"
              className="w-24 ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-transparent bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-800"
            >
              Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
