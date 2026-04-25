import MetricCard from '../components/MetricCard';

function OverviewSection({ data }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">首页总览</h2>
        <p className="mt-1 text-sm text-slate-600">快速查看今日执行情况与关键提醒。</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="今日用药任务" value={`${data.todayMedicationTasks} 项`} />
        <MetricCard label="已完成任务" value={`${data.completedTasks} 项`} />
        <MetricCard label="低库存预警" value={`${data.lowStockAlerts} 项`} hint="建议提前补药" />
        <MetricCard label="下次复诊日期" value={data.nextFollowUpDate} />
        <MetricCard label="本周依从率" value={data.weeklyAdherenceRate} hint="基于已记录打卡" />
      </div>
    </section>
  );
}

export default OverviewSection;
