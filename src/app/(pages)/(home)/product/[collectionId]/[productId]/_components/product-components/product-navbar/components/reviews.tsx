"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { ReviewForm } from "./review-form";

interface IProps {
  product: Prisma.ProductGetPayload<{
    include: {
      reviews: {
        include: {
          user: true;
        };
      };
    };
  }>;
}

export const Reviews: FC<IProps> = ({ product }) => {
  return (
    <div className="">
      <ScrollArea
        className={cn("", {
          "h-[500px]": product?.reviews.length > 3,
        })}
      >
        <div className="flex flex-col gap-10">
          {product?.reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-3">
              {review?.user.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Image
                    src={user?.avatar || ""}
                    alt={user?.username || ""}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />

                  <div className="flex flex-col gap-2">
                    <p className="text-lg">{user?.username}</p>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={cn("text-yellow-500", {
                            "fill-yellow-500": idx < review?.rating,
                          })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold">{review?.title}</p>
                <p className="text-lg text-[#454349]">{review?.body}</p>
                <p>
                  <span className="text-[#a3a3a3]">Отзыв одобрен</span> Krist{" "}
                  <span className="text-[#a3a3a3]">опубликован</span>{" "}
                  {new Date(review.dateTime).toLocaleDateString("ru")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-20">
        <ReviewForm />
      </div>
    </div>
  );
};
