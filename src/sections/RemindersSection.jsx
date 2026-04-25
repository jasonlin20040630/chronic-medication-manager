import TimelineItem from '../components/TimelineItem';

function RemindersSection({ reminders }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">提醒中心</h2>
        <p className="mt-1 text-sm text-slate-600">时间轴展示用药、补药与复诊提醒。</p>
      </div>

      <ol className="space-y-4 border-l border-slate-200 pl-4">
        {reminders.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ol>
    </section>
  );
}

export default RemindersSection;
