"use client";

import { AuthService } from "@/actions/user/auth/auth-service";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user-session"],
    queryFn: AuthService.getSession
  });

  return { user, isLoading };
};
