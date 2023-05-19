import { SideBar } from "../../components/sidebar"
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";


export default function Post(props){
    console.log(props);

    return(
        <div>
            <h1>post page</h1>
        </div>
    )
}


Post.getSideBar = function getSideBar(page, pageProps){
    return <SideBar {...pageProps}>{page}</SideBar>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(contex){
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
                keywords: post.keywords
            }
        }

    }
})