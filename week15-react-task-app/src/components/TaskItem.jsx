function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li
            className={`group flex items-center gap-3 rounded-2xl border px-4 py-4 transition-all duration-300 ${
            task.done
            ? "border-emerald-100 bg-emerald-50/70"
            : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            }`}
        >
      {/* 完了切り替えボタン */}
        <button
            type="button"
            onClick={() => onToggle(task.id)}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            task.done
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 bg-white hover:border-indigo-500"
            }`}
            aria-label={
            task.done ? "未完了に戻す" : "完了にする"
            }
        >
            {task.done && (
            <span className="text-xs font-bold">
                ✓
            </span>
            )}
        </button>

      {/* タスク名 */}
        <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="min-w-0 flex-1 text-left"
        >
        <p
            className={`break-words text-sm font-medium transition-all sm:text-base ${
            task.done
            ? "text-slate-400 line-through"
            : "text-slate-700"
            }`}
        >
            {task.text}
        </p>
        </button>

      {/* 削除ボタン */}
        <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 opacity-70 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        >
            削除
        </button>
    </li>
    );
}

export default TaskItem;