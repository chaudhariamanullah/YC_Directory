import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { Startup_Views_Query } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export default async function View({id}:{id:string}){
    const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(Startup_Views_Query , { id });

         await writeClient
        .patch(id)
        .set({views: totalViews + 1})
        .commit();

    return(
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">
                    {totalViews} {totalViews === 1 ? 'View' : 'Views'}
                </span>
            </p>
        </div>
    )
}