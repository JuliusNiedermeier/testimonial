import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FormStore = {
  storeHydrated: boolean;
  setStoreHydrated: () => void;
  currentStepIndex: number | null;
  setCurrentStepIndex: (index: number) => void;
};

export const useFormState = create<FormStore>()(
  persist(
    (set) => ({
      storeHydrated: false,
      setStoreHydrated: () => set({ storeHydrated: true }),
      currentStepIndex: null,
      setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
    }),
    {
      name: "form-state",
      onRehydrateStorage: () => (state) => state?.setStoreHydrated(),
    }
  )
);
