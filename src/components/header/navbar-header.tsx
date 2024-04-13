"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { trpc } from "@/trpc-client/client";
import { Skeleton } from "../ui/skeleton";

export const NavbarHeader = () => {
  const { data: category, isLoading } = trpc.category.getCategories.useQuery();

  return (
    <NavigationMenu>
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="text-lg font-medium">
            Главная
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-medium">
            Каталог
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-4">
              {isLoading ? (
                <>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="">
                      <Skeleton className="w-full h-4 bg-slate-200" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {category?.map((category) => (
                    <div
                      key={category.id}
                      className="flex flex-col gap-y-[10px] space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground
                  text-md font-bold"
                    >
                      <Link
                        href={`/products-catalog/?categoryId=${category.id}`}
                        className="select-none capitalize"
                      >
                        {category.name}
                      </Link>

                      {category.collection?.map((collection) => (
                        <div key={collection.id} className="">
                          <Link
                            href={`/products-catalog/?categoryId=${category.id}&collectionId=${collection.id}`}
                            className="hover:text-black transition duration-300 capitalize text-sm leading-snug text-muted-foreground"
                          >
                            {collection.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div className="flex items-center gap-[20px]">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/our-story"
              className="text-lg font-medium"
            >
              О нас
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/our-story"
              className="text-lg font-medium"
            >
              Блог
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/our-story"
              className="text-lg font-medium"
            >
              Связаться с нами
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-md font-bold leading-none">{title}</div>
          <p className=" text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
