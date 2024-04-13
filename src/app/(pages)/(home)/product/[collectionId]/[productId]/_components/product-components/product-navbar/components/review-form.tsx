"use client";

import { InputValidated } from "@/app/(pages)/auth/_components/input-validated";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { postReviewSchema } from "@/server/zod-validators/post-review.validator";
import { trpc } from "@/trpc-client/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ReviewForm: FC = () => {
  const { data: user } = trpc.authUser.getUserSession.useQuery();
  const { mutateAsync, isLoading } = trpc.createReview.useMutation();
  const { productId } = useParams<{ productId: string }>();

  const schema = z.object({
    title: z.string().min(1, "Это поле обязательно"),
    body: z.string().min(1, "Это поле обязательно"),
    productId: z.string(),
    rating: z.number().min(1, "Выберите ваш рейтинг"),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      title: "",
      body: "",
      productId: productId!,
      rating: 0,
    },

    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await mutateAsync(
        {
          ...data,
          userId: user?.id!,
        },
        {
          onSuccess: () => {
            toast.success("Отзыв успешно оставлен");
            window.location.reload();
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <p className="font-bold text-2xl">Оставить отзыв</p>

      <div className="mt-5 flex flex-col gap-2">
        <p className="text-lg">Оценка</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <Controller
              control={control}
              name="rating"
              render={({ field, fieldState: { error } }) => {
                return (
                  <div className="flex items-center gap-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        {...field}
                        onClick={() => {
                          field.onChange(idx + 1);
                        }}
                        key={idx}
                        className={cn("text-[#535257] cursor-pointer", {
                          "text-yellow-500 fill-yellow-500":
                            field.value && idx < field.value,
                        })}
                        size={30}
                      />
                    ))}
                  </div>
                );
              }}
            />

            {errors?.rating && (
              <p className="text-red-500">{errors?.rating?.message}</p>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <InputValidated
              register={register("title")}
              label="Заголовок"
              errors={errors?.title?.message}
              placeholder="Заголовок"
              className="w-full text-xl"
              labelClassName="text-lg"
            />

            <InputValidated
              register={register("body")}
              label="Сообщение"
              errors={errors?.body?.message}
              placeholder="Сообщение"
              className="w-full text-xl"
              labelClassName="text-lg"
            />

            <Button type="submit" className="w-2/12 py-7 text-lg">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Оставить отзыв"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
