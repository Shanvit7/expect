import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { projectPreferencesStorage } from "@expect/supervisor";

interface ProjectPreferencesStore {
  cookieBrowserKeys: string[];
  setCookieBrowserKeys: (keys: string[]) => void;
  clearCookieBrowserKeys: () => void;
  lastBaseUrl: string | undefined;
  setLastBaseUrl: (url: string | undefined) => void;
}

export const useProjectPreferencesStore = create<ProjectPreferencesStore>()(
  persist(
    (set) => ({
      cookieBrowserKeys: [],
      setCookieBrowserKeys: (keys: string[]) => set({ cookieBrowserKeys: keys }),
      clearCookieBrowserKeys: () => set({ cookieBrowserKeys: [] }),
      lastBaseUrl: undefined,
      setLastBaseUrl: (url: string | undefined) => set({ lastBaseUrl: url }),
    }),
    {
      name: "project-preferences",
      storage: createJSONStorage(() => projectPreferencesStorage),
    },
  ),
);
