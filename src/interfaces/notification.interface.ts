import { icons } from "lucide-react";

export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: Date;
  avatar?: string;
  icon?: keyof typeof icons;
}
