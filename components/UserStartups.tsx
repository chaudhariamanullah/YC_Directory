import { client } from "@/sanity/lib/client";
import { Startup_By_Author_Query } from "@/sanity/lib/queries";
import StartUpCard, { StartUpCardType } from "./StartUpCard";


export default async function UserStartups({id} : {id:string}) {
    
    const startups = await client.fetch(Startup_By_Author_Query, {id})

    return(
        <>
            { startups.length > 0 ? (
                startups.map((startup: StartUpCardType)=>(
                    <StartUpCard key = {startup._id} post = {startup}/>
                ))
            ) : (
                <p className="no-result">No Posts Yet</p>
            )}
        </>
    )
}   
