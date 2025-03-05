import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ teamSlug: string }> }
) => {
  const { teamSlug } = await params;
  redirect(`/dashboard/team/${teamSlug}/testimonials`);
};
