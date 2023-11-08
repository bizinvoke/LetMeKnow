import { create, StoreApi, UseBoundStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createSampleSlice, SampleSlice } from './sample';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useBoundStore = create<SampleSlice>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...createSampleSlice(...a),
        }),
        {
          name: 'Zustand-Store',
          partialize: (state) =>
            Object.fromEntries(
              Object.entries(state).filter(([key]) => !['xxx'].includes(key)),
            ),
        },
      ),
    ),
  ),
);

export const useStoreSelectors = createSelectors(useBoundStore);
