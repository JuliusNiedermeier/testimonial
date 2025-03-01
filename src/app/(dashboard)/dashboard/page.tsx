import { db } from "@/app/_shared/db";
import { FC } from "react";
import { CreateSpaceForm } from "@/app/(dashboard)/_components/create-space-form";
import { SpaceListItem } from "../_components/space-list-item";

const Dashboard: FC = async () => {
  const spaces = await db.query.spaceTable.findMany();

  return (
    <div className="p-6 h-[100svh]">
      <div className="w-[30rem] border h-full">
        <CreateSpaceForm />
        <div className="flex flex-col border-t divide-y">
          {spaces.map((space) => (
            <SpaceListItem key={space.id} {...space} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
