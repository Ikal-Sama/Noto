"use client";

import { getAuthUserQuery } from "@/lib/queries/userQueries";
import { useQuery } from "@tanstack/react-query";

export const UserDetails = () => {
  const { data: user } = useQuery(getAuthUserQuery());
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{user?.name}</h1>
      <span className="text-muted-foreground">{user?.email}</span>
    </div>
  );
};
