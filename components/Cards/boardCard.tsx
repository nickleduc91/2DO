import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BoardCard = ({ board, handleRemoveBoard }: any) => {
  const getPercentage = (board: any) => {
    if (board.completionCount == 0) {
      return 0;
    }
    return (board.completionCount / board.tasks.length) * 100;
  };

  return (
    <div className="mx-auto w-full max-w-md py-4 px-4 justify-center items-center">
      <div className="h-44 flex flex-col justify-between rounded-3xl bg-white hover:bg-gray-50 dark:bg-slate-800 shadow-xl mb-6 py-5 px-4">
        <Link
          className="flex flex-col justify-between h-full"
          href={`/boards/${board._id}`}
        >
          <div>
            <h4 className="truncate text-cyan-500 text-3xl font-medium leading-tight flex items-center text-center justify-center underline">
              {board.name}
            </h4>
            <p className="text-gray-400 dark:text-white text-md flex items-center text-center justify-center">
              {board.description}
            </p>
          </div>
          <div className="shadow-slate-200 rounded-lg w-1/3 -mb-6">
            <div className="pr-1 flex items-center justify-between">
              <span className="dark:text-white text-sm text-slate-500">
                Completion
              </span>
              <span
                className={classNames(
                  board.completionCount == board.tasks.length
                    ? "bg-teal-50 dark:bg-slate-700 text-teal-400"
                    : "bg-cyan-50 dark:bg-slate-700 text-cyan-500",
                  "px-2 py-1 rounded-lg text-xs font-medium min-w-[46px] text-center"
                )}
              >
                {Math.ceil(getPercentage(board))}%
              </span>
            </div>

            <div className="ml-3 w-24 bg-slate-200 dark:bg-slate-700 mt-1">
              <div
                className={classNames(
                  board.completionCount == board.tasks.length
                    ? "bg-teal-400"
                    : "bg-cyan-400",
                  "h-1 rounded-full"
                )}
                style={{ width: getPercentage(board) }}
              ></div>
            </div>
          </div>
        </Link>

        {/* Icons at the bottom right of the card */}
        <div className="flex items-end justify-end">
          <i
            className="ri-delete-bin-2-line ri-xl hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white mr-4"
            onClick={() => handleRemoveBoard(board)}
          ></i>
          <a
            className="ri-share-circle-line ri-xl hover:text-cyan-500 dark:hover:text-cyan-500 text-black dark:text-white"
            href={`/boards/${board._id}`}
          ></a>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
