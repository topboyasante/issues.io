import { create } from "zustand";

type Store = {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
};

export const useIssuesStore = create<Store>()((set) => ({
  //This is a check to see if the sidebar has been expanded to its full width
  isSidebarExpanded: true,
  //We use this to "toggle" the check from true to false
  toggleSidebar() {
    set((state) => {
      return {
        isSidebarExpanded: !state.isSidebarExpanded,
      };
    });
  },
}));