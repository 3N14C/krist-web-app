"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useEdgeStore } from "@/lib/edgestore";
import { updateCurrentUserSchema } from "@/server/zod-validators/update-current-user.validator";
import { useNotificationsStore } from "@/store/notifications-store";
import { trpc } from "@/trpc-client/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2 } from "lucide-react";
import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormEditProfile: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileAvatar, setFileAvatar] = useState<File>();
  const [progress, setProgress] = useState<number>(0);

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const { edgestore } = useEdgeStore();

  const { data: user, isLoading: isLoadingUser } =
    trpc.authUser.getUserSession.useQuery();

  const { mutateAsync, isLoading: isLoadingChangeUser } =
    trpc.authUser.updateCurrentUser.useMutation();

  const { addNotification } = useNotificationsStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof updateCurrentUserSchema>>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar || "",
      phoneNumber: user?.phone || "",
    },

    resolver: zodResolver(updateCurrentUserSchema),
  });

  const onSubmit = async (data: z.infer<typeof updateCurrentUserSchema>) => {
    try {
      await mutateAsync(
        {
          avatar: avatarPreview || user?.avatar,
          email: data.email || user?.email,
          username: data.username || user?.username,
          phoneNumber: data.phoneNumber || user?.phone,
        },
        {
          onSuccess: () => {
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
        }
      );
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
      <div className="w-[1250px] flex items-center justify-between">
        <div className="relative">
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

        <Button type="submit" className="px-20 py-7">
          {isLoadingChangeUser ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            "Сохранить"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-10 items-center mt-10">
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
