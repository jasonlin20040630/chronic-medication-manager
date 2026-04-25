import MetricCard from '../components/MetricCard';

function OverviewSection({ metrics }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">首页总览</h2>
        <p className="mt-1 text-sm text-slate-600">快速查看今日执行情况与关键提醒。</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="今日用药任务" value={`${metrics.todayMedicationTasks} 项`} />
        <MetricCard label="已完成任务" value={`${metrics.completedTasks} 项`} />
        <MetricCard label="已跳过任务" value={`${metrics.skippedTasks} 项`} />
        <MetricCard label="低库存预警" value={`${metrics.lowStockAlerts} 项`} hint="建议提前补药" />
        <MetricCard label="下次复诊日期" value={metrics.nextFollowUpDate} />
        <MetricCard label="本周依从率" value={metrics.weeklyAdherenceRate} hint="基于今日记录估算" />
      </div>
    </section>
  );
}

export default OverviewSection;
