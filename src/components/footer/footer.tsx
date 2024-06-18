"use client";

import { ArrowRight, Mail, MapPin, PhoneCall } from "lucide-react";
import { FC } from "react";
import { Logo } from "../ui/logo";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

const infoLinks = [
  {
    id: 1,
    title: "Мой аккаунт",
    link: "/profile?profilePage=user",
  },

  {
    id: 2,
    title: "Вход",
    link: "/auth/login",
  },

  {
    id: 3,
    title: "Моя корзина",
    link: "/checkout",
  },

  {
    id: 4,
    title: "Мое избранное",
    link: "/profile?profilePage=wishlist",
  },

  {
    id: 5,
    title: "Мои заказы",
    link: "/profile?profilePage=orders",
  },
];

const serviceLinks = [
  {
    id: 1,
    title: "О нас",
    link: "/about",
  },

  {
    id: 2,
    title: "Наш опыт",
    link: "/expirience",
  },

  {
    id: 3,
    title: "Информация о доставке",
    link: "/orders-info",
  },

  {
    id: 4,
    title: "Политика конфиденциальности",
    link: "/privacy-policy",
  },

  {
    id: 5,
    title: "Условия использования",
    link: "/terms-conditions",
  },
];

export const Footer: FC = () => {
  const schema = z.object({
    email: z.string().email({ message: "Некорректная почта" }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      console.log(data);
      reset();
      toast.success("Вы успешно подписались на рассылку");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка при подписке");
    }
  };

  return (
    <div className="bg-[#1b1b1b] px-[60px] py-[60px]">
      <div className="grid lg:grid-cols-4 lg:gap-0 gap-10 items-start">
        {/* FIRST COLUMN */}
        <div className="text-[#bfbfc0]">
          <Logo color="#fff" className="text-white" />

          <div className="mt-10 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <PhoneCall color="#bfbfc0" />
              <p>8 (904) 555-0127</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail />
              <p>boss@example.com</p>
            </div>

            <div className="flex items-start gap-2">
              <MapPin />
              <p className="max-w-[250px]">
                Иркутск, 62639
              </p>
            </div>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="">
          <p className="text-white text-xl">Информация</p>

          <div className="text-[#bfbfc0] flex flex-col gap-5 mt-10">
            {infoLinks.map((item) => (
              <Link href={item.link} key={item.id}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* THIRD COLUMN */}
        <div className="">
          <p className="text-white text-xl">Сервис</p>

          <div className="text-[#bfbfc0] flex flex-col gap-5 mt-10">
            {serviceLinks.map((item) => (
              <Link href={item.link} key={item.id}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* FOURTH COLUMN */}
        <div className="text-[#bfbfc0] flex flex-col gap-5">
          <p className="text-white text-xl">Подписаться на нашу рассылку</p>

          <p>
            Введите свой почтовый адрес электронной почты, чтобы первым узнать о
            новых продуктах и акциях.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 border border-white rounded-lg px-5 py-2"
          >
            <Mail size={30} />
            <Input
              className="bg-transparent border-none"
              placeholder="Ваша почта"
              {...register("email")}
            />

            <Button type="submit" variant={"ghost"}>
              <ArrowRight />
            </Button>
          </form>

          {errors.email && (
            <p className="text-red-500 text-center">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
