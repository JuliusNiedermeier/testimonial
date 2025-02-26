import { useLiveQuery } from "dexie-react-hooks";
import { localDb, Space } from "./local-db";
import { useEffect, useRef } from "react";
import { clamp } from "motion";

export type SpaceUpdate = Partial<Omit<Space, "id">>;

export const useSpace = (spaceId: string, stepCount: number) => {
  const initialized = useRef(false);

  const space = useLiveQuery(
    async () => (await localDb.spaces.get(spaceId)) || null
  );

  // Initialize new space if no space with that spaceId exists on client.
  useEffect(() => {
    if (space === null) {
      localDb.spaces.add({
        id: spaceId,
        currentStepIndex: 0,
      });
    }
  }, [space]);

  // Jump to first step after completion
  useEffect(() => {
    if (initialized.current || !space) return;

    if (space.currentStepIndex >= stepCount - 1) {
      update({ currentStepIndex: 0 });
    }

    initialized.current = true;
  }, [space]);

  const update = (update: SpaceUpdate) => {
    localDb.spaces.update(
      spaceId,
      update.currentStepIndex !== undefined
        ? {
            ...update,
            currentStepIndex: clamp(0, stepCount - 1, update.currentStepIndex),
          }
        : update
    );
  };

  return { space, update };
};
