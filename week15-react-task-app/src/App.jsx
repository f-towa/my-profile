import {
  useEffect,
  useState,
} from "react";
import TaskItem from "./components/TaskItem";

function App() {
  // -----------------------------
  // state
  // -----------------------------

  // localStorageに保存済みのタスクがあれば読み込む
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  // 入力欄
  const [input, setInput] = useState("");

  // フィルター
  const [filter, setFilter] =
    useState("all");

  // -----------------------------
  // localStorage
  // -----------------------------

  // tasksが変わるたびに保存
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks),
    );
  }, [tasks]);

  // -----------------------------
  // タスク追加
  // -----------------------------

  const addTask = (event) => {
    event.preventDefault();

    const text = input.trim();

    // 空文字は追加しない
    if (text === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text,
      done: false,
    };

    // 元のtasksは変更せず、
    // 新しい配列を作る
    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);

    // 入力欄を空に戻す
    setInput("");
  };

  // -----------------------------
  // 完了切り替え
  // -----------------------------

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
            }
          : task,
      ),
    );
  };

  // -----------------------------
  // 削除
  // -----------------------------

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task.id !== id,
      ),
    );
  };

  // -----------------------------
  // フィルター
  // -----------------------------

  const filteredTasks = tasks.filter(
    (task) => {
      if (filter === "active") {
        return !task.done;
      }

      if (filter === "completed") {
        return task.done;
      }

      return true;
    },
  );

  // -----------------------------
  // タスク数
  // -----------------------------

  const completedCount = tasks.filter(
    (task) => task.done,
  ).length;

  const remainingCount =
    tasks.length - completedCount;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedCount /
            tasks.length) *
            100,
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 px-4 py-10 sm:py-16">
      <main className="mx-auto max-w-2xl">
        {/* ヘッダー */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold tracking-wide text-indigo-600">
              MY TASKS
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            今日やること
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            小さなタスクから、
            ひとつずつ片付けよう。
          </p>
        </header>

        {/* メインカード */}
        <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-xl shadow-indigo-100/50 backdrop-blur">
          {/* 入力エリア */}
          <div className="border-b border-slate-100 p-5 sm:p-7">
            <form
              onSubmit={addTask}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(
                    event.target.value,
                  )
                }
                placeholder="新しいタスクを入力..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 sm:text-base"
              />

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg active:translate-y-0 sm:text-base"
              >
                ＋ タスクを追加
              </button>
            </form>
          </div>

          {/* 進捗 */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">
                  TODAY'S PROGRESS
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {tasks.length === 0
                    ? "まずはタスクを追加しよう"
                    : `${completedCount} / ${tasks.length} 件完了`}
                </p>
              </div>

              <p className="text-2xl font-bold text-indigo-600">
                {progress}
                <span className="ml-0.5 text-sm">
                  %
                </span>
              </p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* フィルター */}
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex rounded-xl bg-slate-100 p-1">
              <FilterButton
                active={filter === "all"}
                onClick={() =>
                  setFilter("all")
                }
              >
                すべて
              </FilterButton>

              <FilterButton
                active={
                  filter === "active"
                }
                onClick={() =>
                  setFilter("active")
                }
              >
                未完了
              </FilterButton>

              <FilterButton
                active={
                  filter === "completed"
                }
                onClick={() =>
                  setFilter("completed")
                }
              >
                完了済み
              </FilterButton>
            </div>

            <p className="text-sm text-slate-400">
              残り
              <span className="mx-1 font-bold text-slate-600">
                {remainingCount}
              </span>
              件
            </p>
          </div>

          {/* タスク一覧 */}
          <div className="p-5 sm:p-7">
            {filteredTasks.length > 0 ? (
              <ul className="space-y-3">
                {filteredTasks.map(
                  (task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={
                        toggleTask
                      }
                      onDelete={
                        deleteTask
                      }
                    />
                  ),
                )}
              </ul>
            ) : (
              <EmptyMessage
                filter={filter}
              />
            )}
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">
          タスクはブラウザに自動保存されます
        </p>
      </main>
    </div>
  );
}

// --------------------------------
// フィルターボタン
// --------------------------------

function FilterButton({
  children,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition sm:flex-none sm:text-sm ${
        active
          ? "bg-white text-indigo-600 shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

// --------------------------------
// タスクが0件のとき
// --------------------------------

function EmptyMessage({ filter }) {
  let message =
    "タスクはまだありません";

  if (filter === "active") {
    message =
      "未完了のタスクはありません";
  }

  if (filter === "completed") {
    message =
      "完了したタスクはまだありません";
  }

  return (
    <div className="py-14 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
        ✓
      </div>

      <p className="font-medium text-slate-500">
        {message}
      </p>

      <p className="mt-1 text-sm text-slate-400">
        新しいタスクを追加してみましょう
      </p>
    </div>
  );
}

export default App;