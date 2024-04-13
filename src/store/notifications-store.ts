import { INotification } from "@/interfaces/notification.interface";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface INotificationsStore {
  notifications: INotification[];

  addNotification: (notification: INotification) => void;
}

export const useNotificationsStore = create<INotificationsStore>()(
  devtools(
    persist(
      (set) => ({
        notifications: [],

        addNotification: (notification) =>
          set((state) => ({
            notifications: [...state.notifications, notification],
          })),
      }),
      {
        name: "notifications",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
