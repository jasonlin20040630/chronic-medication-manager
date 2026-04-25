export const defaultOverview = {
  nextFollowUpDate: '2026-05-06',
};

export const defaultMedicationPlans = [
  {
    id: 1,
    name: '缬沙坦胶囊',
    diseaseTag: '高血压',
    dosage: '80mg / 次',
    frequency: '每日 1 次',
    scheduledTimes: ['08:00'],
    stock: 18,
    pillsPerDay: 1,
    note: '按医生处方连续服用，早餐后服用。',
  },
  {
    id: 2,
    name: '二甲双胍缓释片',
    diseaseTag: '2型糖尿病',
    dosage: '500mg / 次',
    frequency: '每日 2 次',
    scheduledTimes: ['08:30', '19:00'],
    stock: 14,
    pillsPerDay: 2,
    note: '根据医生处方使用，晚餐后注意血糖记录。',
  },
  {
    id: 3,
    name: '阿托伐他汀钙片',
    diseaseTag: '血脂管理',
    dosage: '20mg / 次',
    frequency: '每日 1 次',
    scheduledTimes: ['21:00'],
    stock: 9,
    pillsPerDay: 1,
    note: '遵循医生处方，睡前服用。',
  },
];

export const staticReminders = [
  {
    id: 1,
    time: '3 天后',
    title: '补药提醒：阿托伐他汀钙片',
    type: 'refill',
    detail: '库存较低，建议提前申请续方或购药。',
  },
  {
    id: 2,
    time: '2026-05-06',
    title: '复诊提醒：心内科线上复诊',
    type: 'follow_up',
    detail: '请准备近期血压、血糖及用药记录。',
  },
];

export const quickQuestions = [
  '我今天还有哪些药没吃？',
  '哪些药快吃完了？',
  '下次复诊前我需要准备什么？',
  '帮我总结本周用药情况',
];
