import { useState } from 'react';

const initialForm = {
  name: '',
  diseaseTag: '',
  dosage: '',
  frequency: '',
  scheduledTimes: '',
  stock: '',
  pillsPerDay: '',
  note: '',
};

function AddPlanForm({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    const scheduledTimes = form.scheduledTimes
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!form.name || !form.dosage || scheduledTimes.length === 0) {
      return;
    }

    onSubmit({
      name: form.name,
      diseaseTag: form.diseaseTag || '未分类',
      dosage: form.dosage,
      frequency: form.frequency || '按医嘱',
      scheduledTimes,
      stock: Number(form.stock) || 0,
      pillsPerDay: Number(form.pillsPerDay) || scheduledTimes.length || 1,
      note: form.note || '基于医生处方或用户录入。',
    });

    setForm(initialForm);
    setIsOpen(false);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">新增用药计划</h3>
          <p className="text-xs text-slate-500">仅记录医生处方或个人录入信息。</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          {isOpen ? '收起表单' : '新增计划'}
        </button>
      </div>

      {isOpen ? (
        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={submitForm}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="药品名称*" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input name="diseaseTag" value={form.diseaseTag} onChange={handleChange} placeholder="病种标签" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input name="dosage" value={form.dosage} onChange={handleChange} placeholder="剂量*（如 1片/次）" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input name="frequency" value={form.frequency} onChange={handleChange} placeholder="频次（如 每日2次）" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input name="scheduledTimes" value={form.scheduledTimes} onChange={handleChange} placeholder="计划时间*（如 08:00,20:00）" className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2" />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="库存" type="number" min="0" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input name="pillsPerDay" value={form.pillsPerDay} onChange={handleChange} placeholder="每日用量" type="number" min="1" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input name="note" value={form.note} onChange={handleChange} placeholder="备注" className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2" />
          <button type="submit" className="sm:col-span-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            保存用药计划
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default AddPlanForm;
