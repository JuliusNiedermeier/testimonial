import { steps } from "@/steps";
import { StepConfig } from "@/utils/step-builder";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface FormContext {
  currentStepConfig: StepConfig;
  next: () => void;
  previous: () => void;
}

const defaultContext: FormContext = {
  currentStepConfig: steps[0],
  next: () => {},
  previous: () => {},
};

const FormContext = createContext<FormContext>(defaultContext);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("Hook useForm must be used inside a <FormProvider>.");
  return context;
};

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentStepId, setCurrentStepId] = useState(
    defaultContext.currentStepConfig.id
  );

  steps[0];

  const currentStepConfig = useMemo(
    () => steps.find((step) => step.id === currentStepId)!,
    [currentStepId]
  );

  const next = () => {
    setCurrentStepId(currentStepConfig.nextStepId || currentStepId);
  };

  const previous = () => {
    setCurrentStepId(
      steps.find((step) => step.nextStepId === currentStepId)?.id ||
        currentStepId
    );
  };

  return (
    <FormContext.Provider value={{ currentStepConfig, next, previous }}>
      {children}
    </FormContext.Provider>
  );
};
