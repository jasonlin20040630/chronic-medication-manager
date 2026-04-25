import { useEffect, useMemo, useState } from 'react';
import SectionNav from '../components/SectionNav';
import OverviewSection from '../sections/OverviewSection';
import PlansSection from '../sections/PlansSection';
import RemindersSection from '../sections/RemindersSection';
import AssistantSection from '../sections/AssistantSection';
import { defaultMedicationPlans, defaultOverview, quickQuestions, staticReminders } from '../data/mockData';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const STATUS_VALUE = {
  taken: 'taken',
  skipped: 'skipped',
  pending: 'pending',
};

function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [plans, setPlans] = useState(() => loadJSON(STORAGE_KEYS.plans, defaultMedicationPlans));
  const [dailyStatus, setDailyStatus] = useState(() => loadJSON(STORAGE_KEYS.dailyStatus, {}));

  useEffect(() => {
    saveJSON(STORAGE_KEYS.plans, plans);
  }, [plans]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.dailyStatus, dailyStatus);
  }, [dailyStatus]);

  const handleUpdateStatus = (planId, time, status) => {
    setDailyStatus((prev) => ({
      ...prev,
      [planId]: {
        ...(prev[planId] || {}),
        [time]: status,
      },
    }));
  };

  const handleAddPlan = (planInput) => {
    const nextPlan = {
      ...planInput,
      id: Date.now(),
    };
    setPlans((prev) => [nextPlan, ...prev]);
  };

  const handleResetDemo = () => {
    setPlans(defaultMedicationPlans);
    setDailyStatus({});
    localStorage.removeItem(STORAGE_KEYS.plans);
    localStorage.removeItem(STORAGE_KEYS.dailyStatus);
  };

  const metrics = useMemo(() => {
    const allTasks = plans.flatMap((plan) => plan.scheduledTimes.map((time) => ({ planId: plan.id, time })));

    const completedTasks = allTasks.filter(({ planId, time }) => dailyStatus[planId]?.[time] === STATUS_VALUE.taken).length;
    const skippedTasks = allTasks.filter(({ planId, time }) => dailyStatus[planId]?.[time] === STATUS_VALUE.skipped).length;
    const lowStockAlerts = plans.filter((plan) => {
      const perDay = plan.pillsPerDay || plan.scheduledTimes.length || 1;
      const remainingDays = perDay > 0 ? Math.floor(plan.stock / perDay) : 0;
      return remainingDays <= 7;
    }).length;

    const effectiveDone = completedTasks + skippedTasks;
    const weeklyAdherenceRate = allTasks.length > 0 ? `${Math.round((effectiveDone / allTasks.length) * 100)}%` : '0%';

    return {
      todayMedicationTasks: allTasks.length,
      completedTasks,
      skippedTasks,
      lowStockAlerts,
      nextFollowUpDate: defaultOverview.nextFollowUpDate,
      weeklyAdherenceRate,
    };
  }, [plans, dailyStatus]);

  const reminders = useMemo(() => {
    const medicationReminders = plans.flatMap((plan) =>
      plan.scheduledTimes.map((time, index) => ({
        id: `${plan.id}-${time}-${index}`,
        time: `今日 ${time}`,
        title: `用药提醒：${plan.name}`,
        type: 'medication',
        detail: `请按医生处方或个人录入计划执行：${plan.dosage}`,
      })),
    );

    return [...medicationReminders, ...staticReminders];
  }, [plans]);

  const content = useMemo(() => {
    switch (activeSection) {
      case 'plans':
        return (
          <PlansSection
            plans={plans}
            dailyStatus={dailyStatus}
            onUpdateStatus={handleUpdateStatus}
            onAddPlan={handleAddPlan}
          />
        );
      case 'reminders':
        return <RemindersSection reminders={reminders} />;
      case 'assistant':
        return <AssistantSection questions={quickQuestions} />;
      case 'overview':
      default:
        return <OverviewSection metrics={metrics} />;
    }
  }, [activeSection, dailyStatus, metrics, plans, reminders]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight">慢病用药小管家</h1>
          <p className="mt-2 text-sm text-slate-600">个人用药计划与复诊提醒</p>
        </div>
      </header>

      <SectionNav activeSection={activeSection} onChange={setActiveSection} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{content}</main>

      <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pb-6 text-xs text-slate-500 sm:px-6">
        <p>安全边界：仅展示医生处方或用户录入信息，不提供诊断、加药或改剂量建议。</p>
        <button
          type="button"
          onClick={handleResetDemo}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
        >
          重置演示数据
        </button>
      </footer>
    </div>
  );
}

export default HomePage;
