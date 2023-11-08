import { createContext, ReactNode, useContext } from 'react';
import useGlobalSample, { GlobalContextProps } from './hooks/useGlobalSample';

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// 创建一个Provider组件，用于包装整个应用
interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const value = useGlobalSample();

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

// 创建一个自定义Hook，用于在组件中访问全局状态和更新函数
export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal必须在GlobalProvider内使用');
  }
  return context;
}
