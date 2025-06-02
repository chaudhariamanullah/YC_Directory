import { auth } from "@/auth"
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { Author_By_Id_Query } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { StartupCardSkeleton } from "@/components/StartUpCard";

export default async function User({params} :{params : Promise<{id: string}>} ){

    const id = (await params).id
    const session = await auth()
    const user = await client.fetch(Author_By_Id_Query, { id });
    console.log(user)
    return (
        <>
         <section className="profile_container">
         <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
         </section>
        </>
    )
}