import type { ISidebarItem } from "@/types/auth.type";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((item) => ({ Component: item.component, path: item.url }))
  );
};
