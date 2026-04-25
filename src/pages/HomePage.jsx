import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEYS = {
  plans: 'cmm_demo_plans',
  todayStatus: 'cmm_demo_today_status',
};

const TABS = ['首页总览', '我的用药计划', '提醒中心', '智能小助手'];

const initialPlans = [
  {
    id: 'plan-metformin',
    name: '二甲双胍片',
    diseaseTag: '2型糖尿病',
    dosage: '0.5g / 次',
    frequency: '每日 2 次（餐后）',
    scheduledTimes: ['08:00', '20:00'],
    stock: 56,
    pillsPerDay: 2,
    note: '医生建议餐后服用，避免胃部不适。',
  },
  {
    id: 'plan-amlodipine',
    name: '苯磺酸氨氯地平片',
    diseaseTag: '高血压',
    dosage: '5mg / 次',
    frequency: '每日 1 次',
    scheduledTimes: ['09:00'],
    stock: 18,
    pillsPerDay: 1,
    note: '遵医嘱每日固定时间服用。',
  },
  {
    id: 'plan-atorvastatin',
    name: '阿托伐他汀钙片',
    diseaseTag: '高脂血症',
    dosage: '20mg / 次',
    frequency: '每日 1 次（睡前）',
    scheduledTimes: ['22:00'],
    stock: 10,
    pillsPerDay: 1,
    note: '服药期间按医生安排复查血脂。',
  },
];

const initialTodayStatus = {
  'plan-metformin|08:00': 'taken',
  'plan-metformin|20:00': 'pending',
  'plan-amlodipine|09:00': 'taken',
  'plan-atorvastatin|22:00': 'skipped',
};

const reminderTimeline = [
  {
    id: 'r-1',
    type: 'medication',
    time: '今天 20:00',
    title: '用药提醒：二甲双胍片',
    description: '请按医生处方在晚餐后服用。',
  },
  {
    id: 'r-2',
    type: 'refill',
    time: '2 天后',
    title: '补药提醒：阿托伐他汀钙片',
    description: '当前库存偏低，请提前准备续药。',
  },
  {
    id: 'r-3',
    type: 'followup',
    time: '2026-05-08',
    title: '复诊提醒：内分泌科复诊',
    description: '建议携带近期血糖记录与化验单。',
  },
];

const quickQuestions = [
  '我今天还有哪些药没吃？',
  '哪些药快吃完了？',
  '下次复诊前我需要准备什么？',
  '帮我总结本周用药情况',
];

const reminderTypeStyle = {
  medication: 'bg-blue-100 text-blue-700',
  refill: 'bg-amber-100 text-amber-700',
  followup: 'bg-violet-100 text-violet-700',
};

const statusMap = {
  pending: { label: '未完成', style: 'bg-slate-100 text-slate-600' },
  taken: { label: '已服用', style: 'bg-emerald-100 text-emerald-700' },
  skipped: { label: '已跳过', style: 'bg-rose-100 text-rose-700' },
};

const emptyForm = {
  name: '',
  diseaseTag: '',
  dosage: '',
  frequency: '',
  scheduledTimes: '',
  stock: '',
  pillsPerDay: '',
  note: '',
};

const todayDateLabel = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

function getStorageValue(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallbackValue;
    }

    return JSON.parse(raw);
  } catch (error) {
    return fallbackValue;
  }
}

function HomePage() {
  const [activeTab, setActiveTab] = useState('首页总览');
  const [plans, setPlans] = useState(() => getStorageValue(STORAGE_KEYS.plans, initialPlans));
  const [todayStatus, setTodayStatus] = useState(() =>
    getStorageValue(STORAGE_KEYS.todayStatus, initialTodayStatus),
  );
  const [formData, setFormData] = useState(emptyForm);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.plans, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.todayStatus, JSON.stringify(todayStatus));
  }, [todayStatus]);

  const metrics = useMemo(() => {
    const totalTasks = plans.reduce((sum, plan) => sum + plan.scheduledTimes.length, 0);

    let completed = 0;
    let skipped = 0;

    plans.forEach((plan) => {
      plan.scheduledTimes.forEach((time) => {
        const status = todayStatus[`${plan.id}|${time}`] ?? 'pending';
        if (status === 'taken') {
          completed += 1;
        }

        if (status === 'skipped') {
          skipped += 1;
        }
      });
    });

    const lowStockCount = plans.filter((plan) => {
      const remainingDays = Math.floor(plan.stock / Math.max(Number(plan.pillsPerDay) || 1, 1));
      return remainingDays <= 7;
    }).length;

    const adherenceRate = totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100);

    return {
      totalTasks,
      completed,
      skipped,
      lowStockCount,
      nextFollowUp: '2026-05-08',
      adherenceRate,
    };
  }, [plans, todayStatus]);

  const quickAnswerMap = useMemo(() => {
    const unfinishedTasks = [];
    plans.forEach((plan) => {
      plan.scheduledTimes.forEach((time) => {
        const status = todayStatus[`${plan.id}|${time}`] ?? 'pending';
        if (status === 'pending') {
          unfinishedTasks.push(`${plan.name}（${time}）`);
        }
      });
    });

    const lowStockPlans = plans
      .map((plan) => {
        const remainingDays = Math.floor(plan.stock / Math.max(Number(plan.pillsPerDay) || 1, 1));
        return { ...plan, remainingDays };
      })
      .filter((plan) => plan.remainingDays <= 7);

    const nextFollowUp = reminderTimeline.find((item) => item.type === 'followup')?.time || '请查看复诊安排';

    return {
      '我今天还有哪些药没吃？':
        unfinishedTasks.length > 0
          ? `今天仍未完成的用药任务有：${unfinishedTasks.join('、')}。请按既定处方时间完成记录。`
          : '你今天计划内的用药任务都已完成或已标记跳过。请继续按医生处方执行后续计划。',
      '哪些药快吃完了？':
        lowStockPlans.length > 0
          ? `当前库存偏低的药品有：${lowStockPlans
              .map((plan) => `${plan.name}（约剩 ${Math.max(plan.remainingDays, 0)} 天）`)
              .join('、')}。建议按现有处方提前安排续药。`
          : '目前没有检测到 7 天内低库存的药品，请继续按当前计划记录库存变化。',
      '下次复诊前我需要准备什么？': `下次复诊时间为 ${nextFollowUp}。建议准备近期用药打卡记录、库存情况与医生要求的检查资料，便于复诊时沟通。`,
      '帮我总结本周用药情况': `本周演示数据中，今日任务共 ${metrics.totalTasks} 项，已服用 ${metrics.completed} 项，已跳过 ${metrics.skipped} 项，当前依从率约 ${metrics.adherenceRate}%。以上仅为记录汇总，不涉及诊断或处方调整建议。`,
    };
  }, [metrics, plans, todayStatus]);

  const updateTaskStatus = (planId, time, status) => {
    setTodayStatus((prev) => ({
      ...prev,
      [`${planId}|${time}`]: status,
    }));
  };

  const handleFieldChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const addPlan = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedTimes = formData.scheduledTimes
      .split(',')
      .map((time) => time.trim())
      .filter(Boolean);

    if (!trimmedName || trimmedTimes.length === 0) {
      return;
    }

    const newPlan = {
      id: `plan-${Date.now()}`,
      name: trimmedName,
      diseaseTag: formData.diseaseTag.trim() || '未分类',
      dosage: formData.dosage.trim() || '按处方',
      frequency: formData.frequency.trim() || '按医嘱',
      scheduledTimes: trimmedTimes,
      stock: Number(formData.stock) || 0,
      pillsPerDay: Number(formData.pillsPerDay) || 1,
      note: formData.note.trim() || '请严格按照医生处方与本人记录执行。',
    };

    setPlans((prev) => [...prev, newPlan]);
    setFormData(emptyForm);
  };

  const resetDemoData = () => {
    setPlans(initialPlans);
    setTodayStatus(initialTodayStatus);
    setFormData(emptyForm);
    setSelectedQuestion('');
    setActiveTab('首页总览');
    localStorage.removeItem(STORAGE_KEYS.plans);
    localStorage.removeItem(STORAGE_KEYS.todayStatus);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">慢病用药小管家 · 产品演示</h1>
              <p className="mt-2 text-sm text-slate-600">
                日期：{todayDateLabel}。所有用药信息均来自医生处方或用户录入，本演示不提供诊断、不推荐新药、不建议调整剂量。
              </p>
            </div>
            <button
              type="button"
              onClick={resetDemoData}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              重置演示数据
            </button>
          </div>

          <nav className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white shadow'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </header>

        {activeTab === '首页总览' && (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard label="今日用药任务" value={`${metrics.totalTasks} 项`} detail="今日计划服药总次数" />
            <MetricCard label="已完成任务" value={`${metrics.completed} 项`} detail={`含跳过 ${metrics.skipped} 项`} />
            <MetricCard label="低库存预警" value={`${metrics.lowStockCount} 种`} detail="预计 7 天内需补药" />
            <MetricCard label="下次复诊日期" value={metrics.nextFollowUp} detail="请提前准备检查资料" />
            <MetricCard label="本周依从率" value={`${metrics.adherenceRate}%`} detail="按今日任务完成度估算" />
          </section>
        )}

        {activeTab === '我的用药计划' && (
          <section className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-2">
              {plans.map((plan) => {
                const remainingDays = Math.floor(plan.stock / Math.max(Number(plan.pillsPerDay) || 1, 1));

                return (
                  <article key={plan.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                        {plan.diseaseTag}
                      </span>
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <InfoItem label="剂量" value={plan.dosage} />
                      <InfoItem label="频次" value={plan.frequency} />
                      <InfoItem label="计划时间" value={plan.scheduledTimes.join(' / ')} />
                      <InfoItem label="当前库存" value={`${plan.stock} 片`} />
                      <InfoItem label="预计剩余" value={`${Math.max(remainingDays, 0)} 天`} />
                      <InfoItem label="备注" value={plan.note} />
                    </dl>

                    <div className="mt-4 space-y-2">
                      {plan.scheduledTimes.map((time) => {
                        const status = todayStatus[`${plan.id}|${time}`] ?? 'pending';
                        const statusItem = statusMap[status];

                        return (
                          <div
                            key={`${plan.id}-${time}`}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{time}</span>
                              <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusItem.style}`}>
                                {statusItem.label}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => updateTaskStatus(plan.id, time, 'taken')}
                                className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700"
                              >
                                已服用
                              </button>
                              <button
                                type="button"
                                onClick={() => updateTaskStatus(plan.id, time, 'skipped')}
                                className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-rose-700"
                              >
                                跳过
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>

            <form onSubmit={addPlan} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">新增用药计划</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <InputField label="药品名称" value={formData.name} onChange={handleFieldChange('name')} required />
                <InputField label="疾病标签" value={formData.diseaseTag} onChange={handleFieldChange('diseaseTag')} />
                <InputField label="剂量" value={formData.dosage} onChange={handleFieldChange('dosage')} />
                <InputField label="频次" value={formData.frequency} onChange={handleFieldChange('frequency')} />
                <InputField
                  label="计划时间（逗号分隔）"
                  value={formData.scheduledTimes}
                  onChange={handleFieldChange('scheduledTimes')}
                  placeholder="如 08:00,20:00"
                  required
                />
                <InputField
                  label="库存（片）"
                  type="number"
                  value={formData.stock}
                  onChange={handleFieldChange('stock')}
                  min="0"
                />
                <InputField
                  label="每日服用片数"
                  type="number"
                  value={formData.pillsPerDay}
                  onChange={handleFieldChange('pillsPerDay')}
                  min="1"
                />
                <InputField label="备注" value={formData.note} onChange={handleFieldChange('note')} />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                保存计划
              </button>
            </form>
          </section>
        )}

        {activeTab === '提醒中心' && (
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">提醒中心时间线</h2>
            <ol className="mt-4 space-y-4">
              {reminderTimeline.map((reminder) => (
                <li key={reminder.id} className="relative rounded-xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${reminderTypeStyle[reminder.type]}`}>
                      {reminder.type === 'medication'
                        ? '用药提醒'
                        : reminder.type === 'refill'
                          ? '补药提醒'
                          : '复诊提醒'}
                    </span>
                    <span className="text-xs text-slate-500">{reminder.time}</span>
                  </div>
                  <p className="mt-2 font-medium text-slate-800">{reminder.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{reminder.description}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {activeTab === '智能小助手' && (
          <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">智能小助手（演示问答）</h2>
            <p className="text-sm text-slate-600">
              以下问题用于快速查看用药信息，不提供诊断或处方调整建议；若需调整治疗方案，请及时咨询医生。
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setSelectedQuestion(question)}
                  className="rounded-xl border border-slate-300 bg-slate-50 p-4 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  {question}
                </button>
              ))}
            </div>

            {selectedQuestion && (
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">问题：{selectedQuestion}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{quickAnswerMap[selectedQuestion]}</p>
              </article>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function MetricCard({ label, value, detail }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </article>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-slate-700">{value}</dd>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <label className="text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-200 transition focus:ring"
      />
    </label>
  );
}

export default HomePage;
