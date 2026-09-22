function BookCard({ title, author, rating, comment }) {
    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold tracking-wider text-indigo-500 uppercase">Book Review</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{title}</h2>
                    <p className="mt-1 text-sm text-gray-400">著者：{author}</p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">📖</div>
            </div>
            <div className="mt-5 flex items-center gap-2">
                <span className="text-yellow-400 text-lg">評価</span>
                <span className="font-semibold text-gray-700">{rating}</span>
                <span className="text-xs text-gray-400">/ 5</span>
            </div>
            <div className="my-4 border-t border-gray-100" />
                <p className="text-sm leading-relaxed text-gray-600">{comment}</p>
                <div className="mt-5">
                    <button className="text-sm font-semibold text-indigo-500 transition hover:text-indigo-700">詳細を見る →</button>
                </div>
            </div>

    );
}

export default BookCard;