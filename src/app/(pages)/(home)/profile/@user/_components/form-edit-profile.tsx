"use client";

import { UserService } from "@/actions/user/user-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useSession } from "@/hooks/use-session";
import { useEdgeStore } from "@/lib/edgestore";
import { updateCurrentUserSchema } from "@/server/zod-validators/update-current-user.validator";
import { useNotificationsStore } from "@/store/notifications-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Loader2 } from "lucide-react";
import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormEditProfile: FC = () => {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [fileAvatar, setFileAvatar] = useState<File>();
  const { addNotification } = useNotificationsStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof updateCurrentUserSchema>>({
    values: {
      username: user?.username || "",
      email: user?.email || "",
      phoneNumber: user?.phone || "",
    },

    resolver: zodResolver(updateCurrentUserSchema),
  });

  const { mutateAsync, isPending: isLoadingChangeUser } = useMutation({
    mutationFn: UserService.updateById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-session"] });
      addNotification({
        id: crypto.randomUUID(),
        date: new Date(),
        title: "Профиль обновлен",
        message: "Вы успешно обновили данные профиля",
        userId: user?.id || "",
        avatar: user?.avatar || "",
      });
      toast.success("Успешно обновлено");
    },

    onError: () => {
      toast.error("Произошла ошибка при обновлении профиля");
    },
  });

  const onSubmit = async (data: z.infer<typeof updateCurrentUserSchema>) => {
    try {
      await mutateAsync({
        avatar: avatarPreview || user?.avatar,
        email: data.email,
        username: data.username,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = () => {
    const input = fileInputRef.current;

    if (input) {
      input.click();

      input.onchange = () => {
        if (input.files) {
          setFileAvatar(input.files[0]);
        }
      };
    }

    return;
  };

  const handleFileChange = async () => {
    if (fileAvatar) {
      const res = await edgestore.publicFiles.upload({
        file: fileAvatar,
        onProgressChange(progress) {
          setProgress(progress);
          console.log(progress);
        },
        options: {
          replaceTargetUrl: avatarPreview,
        },
      });

      setAvatarPreview(res.url);

      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="lg:w-[1250px] flex lg:flex-row flex-col lg:gap-0 gap-3 items-center lg:justify-between justify-center">
        <div className="relative order-1">
          <Avatar className="h-28 w-28 bg-slate-400">
            <AvatarImage
              className="bg-slate-400"
              src={avatarPreview ? avatarPreview : user?.avatar || ""}
              alt={user?.username}
            />
            <AvatarFallback className="select-none">
              {user?.username}
            </AvatarFallback>
          </Avatar>

          {progress > 0 && progress < 100 && <Progress value={progress} />}

          <Edit
            className="absolute bottom-0 right-0 cursor-pointer"
            onClick={handleFileUpload}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-col gap-4 order-3">
          <Button
            type="submit"
            className="px-20 py-7 "
            disabled={isLoadingChangeUser}
          >
            {isLoadingChangeUser ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Сохранить"
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-center mt-10 order-2">
        <div className="">
          <Input
            {...register("username")}
            placeholder={`Изменить имя: ${user?.username}`}
            className="py-7"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="">
          <Input
            {...register("email")}
            placeholder={`Изменить почту: ${user?.email}`}
            className="py-7"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="">
          <Input
            {...register("phoneNumber")}
            placeholder={
              `Изменить номер телефона: ${user?.phone}` ||
              "Добавьте номер телефона"
            }
            className="py-7"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};
