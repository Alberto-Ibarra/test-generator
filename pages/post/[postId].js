import { SideBar } from "../../components/sidebar"
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { getAppProps } from '@/utils/getAppProps';


export default function Post(props){
    console.log(props);

    return(
        <div className="overflow-auto h-full">
            <Link href="/post/new"><button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 mt-4 ml-4 rounded">Back</button></Link>
            <div className="max-w-screen-sm mx-auto">
                <div className="text-lg font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                    Keywords
                </div>
                <div className="flex flex-wrap pt-2 gap-1">
                    {props.keywords.split(",").map((keyword, i) => (
                        <div key={i} className="p-2 rounded-full bg-slate-950 text-white">
                            {keyword}
                        </div>
                    ))}
                </div>
                <div className="text-lg font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                    Quiz
                </div>
                <div dangerouslySetInnerHTML={{__html:props.post || ""}}/>
            </div>
        </div>
    )
}


Post.getSideBar = function getSideBar(page, pageProps){
    return <SideBar {...pageProps}>{page}</SideBar>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(contex){

            const props = await getAppProps(contex)

        const userSession = await getSession(contex.req, contex.res)
        const client = await clientPromise
        const db = client.db("quizkid")
        const user = await db.collection("posts").findOne({
            userId: userSession.user.sub
        })
        const post = await db.collection("posts").findOne({
            _id: new ObjectId(contex.params.postId),
            userId: user.userId
        })

        if(!post){
            return{
                redirect: {
                    destination: "/post/new",
                    permanent: false
                }
            }
        }

        return{
            props: {
                post: post.content,
                title: post.title,
                keywords: post.keywords,
                ...props
            }
        }

    }
})