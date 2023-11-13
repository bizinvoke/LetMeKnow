export const subjectOptions = [
  { label: '国语', value: 1 },
  { label: '英语', value: 2 },
  { label: '数学(即将推出)', value: 3, disabled: true },
  { label: '历史(即将推出)', value: 4, disabled: true },
  { label: '地理(即将推出)', value: 5, disabled: true },
];
export const subjectMap = new Map<number, string>([
  [1, '国语'],
  [2, '英语'],
  [3, '数学'],
  [4, '历史'],
  [5, '地理'],
]);

export const languageOptions = [
  { label: '日语', value: 1 },
  { label: '英语', value: 2 },
  { label: '汉语', value: 3 },
];

export const languageMap = new Map<number, string>([
  [1, '日语'],
  [2, '英语'],
  [3, '汉语'],
]);
