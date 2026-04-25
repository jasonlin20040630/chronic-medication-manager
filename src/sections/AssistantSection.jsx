function AssistantSection({ questions }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">智能小助手</h2>
        <p className="mt-1 text-sm text-slate-600">可快速提问查看你的记录信息，不提供诊断或改药建议。</p>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-700">你可以尝试以下问题：</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {questions.map((question) => (
            <button
              key={question}
              type="button"
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100"
            >
              {question}
            </button>
          ))}
        </div>

        <p className="mt-5 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          安全提示：本应用仅展示基于医生处方或用户录入的用药信息，不提供医疗诊断，不推荐新增药物，也不建议调整剂量。
        </p>
      </article>
    </section>
  );
}

export default AssistantSection;
