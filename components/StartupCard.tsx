import { cn, fromateDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { DELETE_BY_ID_QUERY } from "@/sanity/lib/quires";


export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = async ({ post,isUserProfilePage }: { post: StartupTypeCard;isUserProfilePage?: boolean }) => {
  const{_createdAt,description,views,author,title,category,_id,image} = post
  const session = await auth();
  const isOwner = session?.id === author?._id; 

  console.log()
  
  return (
    <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-[0_10px_20px_rgba(0,0,0,0.25)] transition-all duration-500 hover:border-[#EE2B69] hover:shadow-2xl hover:bg-[#FFE8F0]">
      <div className="flex-between">
        <p className="startup-card_date">{fromateDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-[#EE2B69] ">
          </EyeIcon>
          {views}
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
        <Link href={`/user/${author?._id}`}>
        <p className="font-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
          <h3 className="text-2xl font-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
        <Image src={author?.image!} alt={author?.name!} width={48} height={48} className="rounded-full"/>
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
      <p className="startup-card_desc">{description}</p>
      <img src={image} alt="placeholder" className="startup-card_img"/>
      </Link>
        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
            </Link>

            {/* i want to show this part only user page */}

            {/* {isUserProfilePage && isOwner && (
                <div>
               <Button>Edit</Button>
               <Button>Delete</Button>
               </div>
            )  } */}

            <Button className="startup-card_btn " asChild>
                <Link href={`/startup/${_id}`}>
                Details
                </Link>
            </Button>

        </div>
    </li>
  );
};
export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);
export default StartupCard;
