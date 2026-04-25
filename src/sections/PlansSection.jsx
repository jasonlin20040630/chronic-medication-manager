import MedicationPlanCard from '../components/MedicationPlanCard';

function PlansSection({ plans }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">我的用药计划</h2>
        <p className="mt-1 text-sm text-slate-600">以下信息基于医生处方和你的录入内容，仅用于管理与提醒。</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {plans.map((plan) => (
          <MedicationPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}

export default PlansSection;
