<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

  <div className="relative w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl">

    {/* CLOSE */}
    <button
      onClick={onSave}
      className="absolute top-4 right-4 text-gray-400 hover:text-white"
    >
      ✕
    </button>

    {/* TITLE */}
    <h2 className="text-xl font-semibold text-black dark:text-white mb-5">
      Add Transaction
    </h2>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* DATE */}
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="input"
      />

      {/* TYPE */}
      <div className="flex gap-2 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setForm({ ...form, type: "income" })}
          className={`flex-1 py-2 rounded-md text-sm ${
            form.type === "income"
              ? "bg-emerald-500 text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Income
        </button>

        <button
          type="button"
          onClick={() => setForm({ ...form, type: "expense" })}
          className={`flex-1 py-2 rounded-md text-sm ${
            form.type === "expense"
              ? "bg-rose-500 text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Expense
        </button>
      </div>

      {/* CATEGORY */}
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="input"
      >
        <option value="">Select category</option>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="input"
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="input h-24 resize-none"
      />

      {/* BUTTON */}
      <button
        type="submit"
        className="mt-2 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
      >
        Add Transaction
      </button>

    </form>
  </div>
</div>