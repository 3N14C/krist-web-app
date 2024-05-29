"use client";

import { UserService } from "@/actions/user/user-service";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

export const UserModal: FC<IProps> = ({ open, setOpen, userId }) => {
  const { data: userOrderService, isLoading } = useQuery({
    queryKey: ["user-order-service", userId],
    queryFn: async () => await UserService.getOrderService({ userId }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="">
          {isLoading ? (
            <>Loading...</>
          ) : (
            <p>{userOrderService?.orderService?.service.name}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
