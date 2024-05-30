"use client";

import { ServiceOrderService } from "@/actions/service-order/order-service-service";
import { UserService } from "@/actions/user/user-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

export const UserModal: FC<IProps> = ({ open, setOpen, userId }) => {
  const { data: serviceOrdersByUser, isLoading } = useQuery({
    queryKey: ["user-order-service", userId],
    queryFn: async () =>
      await ServiceOrderService.getServiceOrdersByUser({ userId }),
  });

  const { data: user } = useQuery({
    queryKey: ["user-by-id", userId],
    queryFn: async () => await UserService.getById({ userId }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="">
          {isLoading ? (
            <>Loading...</>
          ) : (
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src={user?.avatar ?? ""}
                      className="bg-zinc-200"
                    />
                    <AvatarFallback className="bg-zinc-200 text-lg">
                      {user?.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p>{user?.email}</p>
                    <p>{user?.username}</p>
                  </div>
                </div>

                <Button>Профиль</Button>
              </div>

              <ScrollArea className="h-[200px] px-4">
                <div className="flex flex-col gap-4">
                  {serviceOrdersByUser?.map((order) => (
                    <div
                      key={order.id}
                      className="border border-black rounded-md p-2"
                    >
                      <div className="">
                        <p>{order.service.name}</p>
                        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-end">
                <Button variant={"outline"} className="">
                  {user?.phone}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
