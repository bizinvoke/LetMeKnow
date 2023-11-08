import { useState } from 'react';

// 创建一个全局Context
interface GlobalState {
  count: number;
  // 添加其他全局状态
}

export interface GlobalContextProps {
  globalState: GlobalState;
}

export default function useGlobalSample() {
  const initialGlobalState: GlobalState = {
    count: 0,
    // 添加其他全局状态
  };
  const [globalState, setGlobalState] =
    useState<GlobalState>(initialGlobalState);

  // 定义一个更新全局状态的函数
  const updateGlobalState = (newState: Partial<GlobalState>) => {
    setGlobalState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return {
    globalState,
    updateGlobalState,
  };
}
