import dayjs from 'dayjs';

const locationPathNamewhiteList = ['/404', '/403'];

export function objSet(
  obj: PureValue,
  keys: string[],
  value: PureValue,
): PureValue {
  const lastKeyIndex = keys.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keys[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[keys[lastKeyIndex]] = value;
  return value;
}

export const parseLocationPathName = (p: string) =>
  locationPathNamewhiteList.includes(p)
    ? p
    : p
        .split('/')
        .map((pp) => (isNaN(parseInt(pp)) ? pp : ':id'))
        .join('/');

export const isThreeLevelMenu = (p: string) => {
  let _isThreeLevel = false;
  p.split('/').forEach((pp) => {
    if (!isNaN(parseInt(pp))) {
      _isThreeLevel = true;
    }
  });
  return _isThreeLevel;
};

export const fallback =
  'data:image/png;base64,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';

export const bigImage = (url: string) => {
  if (url === '') return '';
  const base = url.substring(0, url.lastIndexOf('/'));
  const parm = url.substring(url.lastIndexOf('?'));
  const path = url.split('?')[0];
  const name = path.split('/')[path.split('/').length - 1];
  const reName = `${name.split('.')[0]}_big.${name.split('.')[1]}`;
  return `${base}/${reName}${parm}`;
};

export const halfWidthKatakana = (s: string) =>
  s.replace(/[^\uFF61-\uFF9F\u0020()]+/g, '');

export const katakana = (s: string) => {
  return s.replace(/[^ぁ-んァ-ン一-龯ー　 ]+/g, '');
};

export const underlineToCamel: any = (data: any) => {
  if (typeof data != 'object' || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => underlineToCamel(item));
  }

  const newData: PureObject = {};
  for (const key in data) {
    const newKey = key.replace(/_([a-z])/g, (p, m) => m.toUpperCase());
    newData[newKey] = underlineToCamel(data[key]);
  }
  return newData;
};

export const camelToUnderline: any = (data: any) => {
  if (typeof data != 'object' || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => camelToUnderline(item));
  }

  const newData: PureObject = {};
  for (const key in data) {
    const newKey = key.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`);
    newData[newKey] = camelToUnderline(data[key]);
  }
  return newData;
};

export const camelToKebab = (str: string) => {
  // 将首字母大写的部分转换为小写，并在前面加上连字符
  return str
    .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
    .replace(/^-/, '');
};

export const secondFormat = (second: number) => {
  const h = Math.floor(second / 360);
  const m = Math.floor(second / 60) % 60;
  const s = second % 60;
  return `${h > 10 ? h : '0' + h} : ${m > 10 ? m : '0' + m} : ${
    s > 10 ? s : '0' + s
  }`;
};

export const replaceValue = <T>(
  map: Map<string, T>,
  key: string,
  newValue: T,
): Map<string, T> => {
  // 新建一个空的 Map，用于存储替换后的键值对
  const newMap = new Map();

  // 遍历原 Map 中的键值对
  for (const [mapKey, value] of map) {
    // 如果当前键是需要替换的键，则将新值存入新 Map 中
    if (mapKey === key) {
      newMap.set(key, newValue);
    } else {
      // 如果当前键不需要替换，则直接将键值对存入新 Map 中
      newMap.set(mapKey, value);
    }
  }

  // 返回新的 Map
  return newMap;
};

export const replaceAllValue = <T>(
  map: Map<string, T>,
  newValue: T,
): Map<string, T> => {
  // 新建一个空的 Map，用于存储替换后的键值对
  const newMap = new Map();

  // 遍历原 Map 中的键值对
  for (const mapKey of map.keys()) {
    // 如果当前键是需要替换的键，则将新值存入新 Map 中
    newMap.set(mapKey, newValue);
  }

  // 返回新的 Map
  return newMap;
};

export const getNextKey = <T>(
  map: Map<string, T>,
  key: string,
): string | undefined => {
  // 获取键值对迭代器
  const iterator = map.entries();

  // 遍历迭代器，找到目标元素
  for (const [currentKey] of iterator) {
    if (currentKey === key) {
      // 如果当前元素是目标元素，则返回迭代器中的下一个元素的键
      if (iterator.next().value === undefined) {
        return undefined;
      }
      if (iterator.next().value.length > 0) return iterator.next().value[0];
    }
  }

  // 如果没找到目标元素，则返回 undefined
  return undefined;
};

export const insertAndDedup = (str: string | null, num: number) => {
  if (str === null) return num.toString();
  const arr = str.split(',').map(Number); // 将字符串转换为数组
  arr.push(num); // 将数字插入到数组末尾
  const deduped = [...new Set(arr)]; // 使用 Set 对象去重
  return deduped.join(','); // 将数组拼接成字符串
};

export const manipulateString = (str: string, num: number) => {
  // 将字符串按逗号分隔成数组
  const arr = str.split(',');

  // 查找参数二是否存在于数组中
  const index = arr.indexOf(num.toString());

  // 如果存在，则从数组中删除该元素
  if (index !== -1) {
    arr.splice(index, 1);
  }

  // 返回修改后的字符串
  return arr.join(',');
};

export const formatFileSize = (sizeInBytes: number) => {
  const KB = 1024;
  const MB = KB * 1024;

  if (sizeInBytes < KB) {
    return sizeInBytes + ' B';
  } else if (sizeInBytes < MB) {
    return (sizeInBytes / KB).toFixed(2) + ' KB';
  } else {
    return (sizeInBytes / MB).toFixed(2) + ' MB';
  }
};

export const base64ToImageFile = (base64: string, name: string) => {
  const byteArray = new Uint8Array(Buffer.from(base64, 'base64'));

  const blob = new Blob([byteArray], { type: 'application/octet-stream' }); // 将字节数组封装成一个二进制对象
  const file = new File([blob], name, { type: 'text/plain' });
  return file;
};

// 获取年龄，如果今天是生日，则年龄加一
export const getAge = (birthday: string): string => {
  if (!birthday) return '';
  const birthDate = dayjs(birthday);
  const now = dayjs();

  let age = now.diff(birthDate, 'year');

  const nextBirthday = birthDate.add(age, 'year');
  const diffDays = nextBirthday.diff(now, 'day');

  if (diffDays <= 0) {
    age += 1;
  }

  return String(age);
};

// 通过dayjs从年龄（年月日）中计算代数：
// 比如 18 岁返回 10代，意思是10-19岁；20 岁返回 20代，意思是20-29岁，以此类推
export const getGeneration = (birthday: string): string => {
  const birthDate = dayjs(birthday);
  const today = dayjs(); // 默认为当前日期
  const ageInYears = today.diff(birthDate, 'year'); // 计算年龄
  const decade = Math.floor(ageInYears / 10) * 10; // 计算代数

  return `${decade}代`;
};

// 通过dayjs从年龄（年月日）中获取月份：
export const getMonthString = (birthday: string): string => {
  // 如果生日为空，则返回空字符串
  if (birthday === '') return '';
  const date = dayjs(birthday);
  // 格式化日期，只包含月份的部分，返回值例如 "3月"
  return date.format('M月');
};

export const joinStrings = (strings: string[]) =>
  strings.filter((i) => i !== '' && i !== '未選択').join('｜');

// 千分位格式化（3桁区切り）
export const formattedPoint = (value: number) => {
  return new Intl.NumberFormat().format(Math.abs(value));
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result?.toString()?.split(',')[1];
      if (base64Data) {
        resolve(base64Data);
      } else {
        reject(new Error('Failed to convert file to base64.'));
      }
    };

    reader.onerror = (event) => {
      reject(event.target?.error);
    };

    reader.readAsDataURL(file);
  });
};

export const parseFolder = (pathString: string): string => {
  // 使用正则表达式检查是否有点号（.）来判断是否是文件
  if (pathString.includes('.')) {
    // 包含点号，说明是文件，返回上层文件夹路径
    return pathString.substring(0, pathString.lastIndexOf('/'));
  } else {
    // 不包含点号，说明是文件夹，直接返回
    return pathString;
  }
};

export const getPathId = (path: string): string => {
  const match = path.match(/\/([^/]+)\/?$/);
  const lastParam = match ? match[1] : '0';

  return lastParam;
};
