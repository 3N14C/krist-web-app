"use client";

import { Package } from "lucide-react";
import { FC } from "react";
import { icons } from "lucide-react";

interface IServiceItemProps {
  icon: keyof typeof icons;
  title: string;
  description: string;
}

const ServiceItem: FC<IServiceItemProps> = ({ icon, title, description }) => {
  const Icon = icons[icon];

  return (
    <div className="">
      <Icon size={35} />

      <div className="mt-3">
        <p className="text-xl font-bold capitalize">{title}</p>

        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export const ServicesList: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <ServiceItem
        icon="Package"
        title="бесплатная доставка"
        description="Бесплатная доставка при заказе от $150"
      />

      <ServiceItem
        icon="CircleDollarSign"
        title="гарантия денег"
        description="Возврат денежных средств в течении 30 дней"
      />

      <ServiceItem
        icon="Headphones"
        title="онлайн поддержка"
        description="24 часа в сутки, 7 дней в неделю"
      />

      <ServiceItem
        icon="CreditCard"
        title="гибкая оплата"
        description="Оплачивайте несколькими кредитными картами"
      />
    </div>
  );
};
