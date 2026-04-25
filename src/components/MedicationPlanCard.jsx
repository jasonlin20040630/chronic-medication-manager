function MedicationPlanCard({ plan }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {plan.diseaseTag}
        </span>
      </div>

      <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">剂量</dt>
          <dd>{plan.dosage}</dd>
        </div>
        <div>
          <dt className="text-slate-500">频次</dt>
          <dd>{plan.frequency}</dd>
        </div>
        <div>
          <dt className="text-slate-500">计划时间</dt>
          <dd>{plan.scheduledTimes.join(' / ')}</dd>
        </div>
        <div>
          <dt className="text-slate-500">库存</dt>
          <dd>{plan.stock} 份</dd>
        </div>
        <div>
          <dt className="text-slate-500">预计剩余天数</dt>
          <dd>{plan.remainingDays} 天</dd>
        </div>
      </dl>

      <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">备注：{plan.note}</p>
    </article>
  );
}

export default MedicationPlanCard;
