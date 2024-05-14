import { FC } from "react";
import prisma from "../../../../../../prisma/prisma-client";
import { ServiceCard } from "./service-card";

const getServices = async () => {
  const services = await prisma.service.findMany({});

  return services;
};

export const ServiceList: FC = async () => {
  const services = await getServices();

  return (
    <div className="grid lg:grid-cols-3 items-end gap-10">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};
