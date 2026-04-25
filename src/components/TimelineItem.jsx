const typeStyleMap = {
  medication: 'bg-blue-50 text-blue-700',
  refill: 'bg-amber-50 text-amber-700',
  follow_up: 'bg-purple-50 text-purple-700',
};

function TimelineItem({ item }) {
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-emerald-500" />
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-slate-900">{item.title}</p>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeStyleMap[item.type]}`}>
            {item.time}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
      </div>
    </li>
  );
}

export default TimelineItem;
