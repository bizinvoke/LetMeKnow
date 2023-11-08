import { reservedKeys } from '@/util/storages';
import { StateCreator } from 'zustand';

type State = {
  step: number;
  pathInputValue: string;
};
type Action = {
  setStep: (step: State['step']) => void;
  setPathInputValue: (pathInputValue: State['pathInputValue']) => void;
};

export type SampleSlice = State & Action;

export const createSampleSlice: StateCreator<State, [], [], SampleSlice> = (
  set,
) => ({
  step: 0,
  pathInputValue: localStorage.getItem(reservedKeys.path) || __DIR_SRC__,
  pages: [],
  setStep: (step) => set(() => ({ step })),
  setPathInputValue: (pathInputValue) => set(() => ({ pathInputValue })),
});
