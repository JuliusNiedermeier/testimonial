import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { cn } from "@/utils/cn";

export default function Home() {
  return (
    <div className="flex flex-col p-8 gap-8 h-[100svh]">
      <div className="flex gap-2">
        {Array.from(new Array(4)).map((_, index) => (
          <div
            key={index}
            className={cn("h-1 flex-1", {
              "bg-foreground-primary": index < 1,
              "bg-foreground-secondary": index >= 1,
            })}
          />
        ))}
      </div>
      <div className="flex-1">
        <h1 className="text-heading font-serif">
          Thank you so much for sharing your feedback with us!
        </h1>
        <p className="text-foreground-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit veniam
          eveniet iusto minus quis. Odio eius error mollitia explicabo nesciunt
          animi at possimus ipsa, architecto voluptatem minima ad laboriosam
          dicta?
        </p>
        <Input />
      </div>
      <Button>Next</Button>
    </div>
  );
}
