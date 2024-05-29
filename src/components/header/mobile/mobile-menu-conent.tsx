"use client";

import { CategoryService } from "@/actions/category/category-service";
import { AuthService } from "@/actions/user/auth/auth-service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const MobileMenuContent: FC = () => {
  const { user, isLoading: isLoadingUser } = useSession();
  const pathname = usePathname();

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["all-categories-mobile"],
    queryFn: CategoryService.getAll,
  });

  const { mutateAsync: signOut, isPending: isPendingSignOut } = useMutation({
    mutationFn: AuthService.signOut,
  });

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-1">
        <Link href={"/"} className="text-md border-b py-2">
          Главная
        </Link>

        <Link href={"/checkout"} className="text-md border-b py-2">
          Корзина
        </Link>

        <Accordion type="multiple">
          {categories?.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger>
                <Link
                  href={`/products-catalog?categoryId=${category.id}`}
                  className="first-letter:capitalize"
                >
                  {category.name}
                </Link>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-5 ml-5">
                  {category.collection.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/products-catalog?categoryId=${category.id}&collectionId=${collection.id}`}
                      className="first-letter:capitalize text-sm underline underline-offset-4"
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col justify-end h-full mb-10">
        {isLoadingUser && (
          <Button className="w-full">
            <Loader2 className="animate-spin" />
          </Button>
        )}

        {user ? (
          <div className="flex flex-col gap-5">
            <Button className="w-full">
              <Link href={"/profile?profilePage=user"}>Профиль</Link>
            </Button>

            <Button
              type="submit"
              variant={"destructive"}
              className=""
              disabled={isPendingSignOut}
            >
              {isPendingSignOut ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Выйти из аккаунта"
              )}
            </Button>
          </div>
        ) : (
          !isLoadingUser && (
            <Button className="w-full">
              <Link href={"/auth/login"}>Войти в аккаунт</Link>
            </Button>
          )
        )}
      </div>
    </div>
  );
};
