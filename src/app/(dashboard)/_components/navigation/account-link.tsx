import Image from "next/image";
import { Skeleton } from "@/app/_shared/components/primitives/skeleton";
import { WithSuspended } from "@/app/_shared/utils/suspense-fallback";
import { cn } from "@/app/_shared/utils/cn";
import { FC } from "react";
import { Session } from "@/app/_shared/utils/auth";

export const AccountLink: FC<WithSuspended<{ user: Session["user"] }>> = (
  props
) => {
  return (
    <div className="p-6 flex gap-4 items-center hover:bg-background-secondary text-left overflow-hidden">
      <div
        className={cn(
          "shrink-0 size-12 relative rounded-full overflow-hidden",
          {
            "bg-background-secondary": !props.suspended,
          }
        )}
      >
        {props.suspended && <Skeleton className="absolute inset-0" />}
        {!props.suspended && props.user.image && (
          <Image
            src={props.user.image}
            alt={props.user.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="overflow-hidden w-full flex flex-col gap-1">
        {props.suspended ? (
          <>
            <Skeleton className="h-[1em] w-2/3" />
            <Skeleton className="h-[1em] w-full" />
          </>
        ) : (
          <>
            <span className="text-label truncate block">{props.user.name}</span>
            <span className="text-foreground-secondary truncate block">
              {props.user.email}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// export const AsyncAccountLink = withSuspenseFallback<
//   object,
//   { user: NonNullable<Awaited<ReturnType<typeof getSession>>>["user"] }
// >({
//   AsyncComponent: async ({ UIComponent }) => {
//     const session = await getSession();

//     if (!session) return null;

//     return <UIComponent user={session.user} />;
//   },
//   UIComponent: (props) => {
//     return (
//       <div className="p-6 flex gap-4 items-center hover:bg-background-secondary text-left overflow-hidden">
//         <div
//           className={cn(
//             "shrink-0 size-12 relative rounded-full overflow-hidden",
//             {
//               "bg-background-secondary": !props.suspended,
//             }
//           )}
//         >
//           {props.suspended && <Skeleton className="absolute inset-0" />}
//           {!props.suspended && props.user.image && (
//             <Image
//               src={props.user.image}
//               alt={props.user.name}
//               fill
//               className="object-cover"
//             />
//           )}
//         </div>
//         <div className="overflow-hidden w-full flex flex-col gap-1">
//           {props.suspended ? (
//             <>
//               <Skeleton className="h-[1em] w-2/3" />
//               <Skeleton className="h-[1em] w-full" />
//             </>
//           ) : (
//             <>
//               <span className="text-label truncate block">
//                 {props.user.name}
//               </span>
//               <span className="text-foreground-secondary truncate block">
//                 {props.user.email}
//               </span>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   },
// });
