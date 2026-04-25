import { useMemo, useState } from 'react';
import SectionNav from '../components/SectionNav';
import OverviewSection from '../sections/OverviewSection';
import PlansSection from '../sections/PlansSection';
import RemindersSection from '../sections/RemindersSection';
import AssistantSection from '../sections/AssistantSection';
import { medicationPlans, overview, quickQuestions, reminders } from '../data/mockData';

function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');

  const content = useMemo(() => {
    switch (activeSection) {
      case 'plans':
        return <PlansSection plans={medicationPlans} />;
      case 'reminders':
        return <RemindersSection reminders={reminders} />;
      case 'assistant':
        return <AssistantSection questions={quickQuestions} />;
      case 'overview':
      default:
        return <OverviewSection data={overview} />;
    }
  }, [activeSection]);

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
    </div>
  );
}

export default HomePage;
