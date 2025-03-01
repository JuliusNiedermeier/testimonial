import { db } from "@/app/_shared/db";
import { FC } from "react";
import { CreateSpaceForm } from "@/app/(dashboard)/_components/create-space-form";
import Link from "next/link";

const Dashboard: FC = async () => {
  const spaces = await db.query.spaceTable.findMany();

  return (
    <div className="p-6 h-[100svh]">
      <div className="w-[30rem] border h-full">
        <CreateSpaceForm />
        <div className="flex flex-col border-t divide-y">
          {spaces.map((space) => (
            <Link
              key={space.id}
              href={`/spaces/${space.slug}`}
              className="text-label p-4 hover:bg-background-secondary"
            >
              {space.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
