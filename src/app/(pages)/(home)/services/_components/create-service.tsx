"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createServiceSchema } from "@/server/zod-validators/post-create-service.validator";
import { trpc } from "@/trpc-client/client";
import { FC, useState } from "react";
import { z } from "zod";

export const CreateService: FC = () => {
  const [name, setName] = useState<string>("");
  const { mutateAsync } = trpc.createService.addService.useMutation({
    onSuccess: () => {
      setName("");
    },
  });

  const handleCreate = async (
    e: React.FormEvent,
    data: z.infer<typeof createServiceSchema>
  ) => {
    e.preventDefault();
    await mutateAsync(data);
    console.log("CREATED");
  };

  return (
    <div className="">
      <form onSubmit={(e) => handleCreate(e, { name })}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};
