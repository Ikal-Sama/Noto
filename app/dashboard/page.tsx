import { auth } from "@/lib/auth"; // Your Better Auth instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/lib/queries/getQueryClient";
import { getUserNotes } from "../server/note.action";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardData from "@/components/dashboard/dashboard-data";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login"); // Redirect to login if not authenticated
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="">
        <DashboardData />
      </div>
    </HydrationBoundary>
  );
};

export default DashboardPage;
