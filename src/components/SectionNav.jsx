const navItems = [
  { key: 'overview', label: '首页总览' },
  { key: 'plans', label: '我的用药计划' },
  { key: 'reminders', label: '提醒中心' },
  { key: 'assistant', label: '智能小助手' },
];

function SectionNav({ activeSection, onChange }) {
  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        {navItems.map((item) => {
          const isActive = activeSection === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default SectionNav;
