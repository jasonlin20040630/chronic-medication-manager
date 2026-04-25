import FeatureCard from '../components/FeatureCard';

const features = [
  { title: '今日用药', description: '查看今天需要服用的药物与时间安排。' },
  { title: '药量提醒', description: '根据剩余药量提前提醒补药，避免断药。' },
  { title: '复诊提醒', description: '记录复诊日期并及时发送提醒。' },
];

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">慢病用药小管家</h1>
          <p className="mt-4 text-lg text-slate-600">个人用药计划与复诊提醒</p>
        </header>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default HomePage;
