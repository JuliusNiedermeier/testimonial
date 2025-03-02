import { db } from "@/app/_shared/db";

db.space
  .create({ data: { title: "Demo", slug: "demo" } })
  .then((space) => console.log("Created demo space", space));
