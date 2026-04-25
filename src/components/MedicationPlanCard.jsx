const statusMap = {
  pending: { label: '未完成', className: 'bg-slate-100 text-slate-700' },
  taken: { label: '已服用', className: 'bg-emerald-100 text-emerald-700' },
  skipped: { label: '已跳过', className: 'bg-amber-100 text-amber-700' },
};

function MedicationPlanCard({ plan, todayStatus, onUpdateStatus }) {
  const estimatedDays = plan.pillsPerDay > 0 ? Math.floor(plan.stock / plan.pillsPerDay) : 0;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {plan.diseaseTag}
        </span>
      </div>

      <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <div><dt className="text-slate-500">剂量</dt><dd>{plan.dosage}</dd></div>
        <div><dt className="text-slate-500">频次</dt><dd>{plan.frequency}</dd></div>
        <div><dt className="text-slate-500">计划时间</dt><dd>{plan.scheduledTimes.join(' / ')}</dd></div>
        <div><dt className="text-slate-500">库存</dt><dd>{plan.stock} 份</dd></div>
        <div><dt className="text-slate-500">预计剩余天数</dt><dd>{estimatedDays} 天</dd></div>
      </dl>

      <div className="mt-4 space-y-2 rounded-lg bg-slate-50 p-3">
        <p className="text-xs font-medium text-slate-600">今日执行状态</p>
        {plan.scheduledTimes.map((time) => {
          const status = todayStatus[time] || 'pending';
          const statusConfig = statusMap[status];

          return (
            <div key={`${plan.id}-${time}`} className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-white p-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-800">{time}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${statusConfig.className}`}>{statusConfig.label}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateStatus(plan.id, time, 'taken')}
                  className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                >
                  已服用
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(plan.id, time, 'skipped')}
                  className="rounded-md bg-amber-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-amber-600"
                >
                  跳过
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">备注：{plan.note}</p>
    </article>
  );
}

export default MedicationPlanCard;
