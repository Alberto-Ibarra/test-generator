import clientPromise from "@/lib/mongodb"
import { getSession } from "@auth0/nextjs-auth0"

export const getAppProps = async (ctx) => {
    const userSession = await getSession(ctx.req, ctx.res)
    const client = await clientPromise
    const db = client.db("quizkid")
    const user = await db.collection("posts").findOne({
        userId: userSession.user.sub
    })

    if(!user){
        return{
            posts: [],
        }
    }

    const posts = await db.collection("posts").find({
        userId: user.userId
    }).sort({
        created: -1
    }).toArray()

    return{
        posts: posts.map(({created, _id, userId, ...rest}) => ({
            _id: _id.toString(),
            created: created.toString(),
            ...rest
        })),
        postId: ctx.params?.postId || null
    }
}